import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

import type { JwtPayload } from "jsonwebtoken";
import type { MyPayload } from "../../types/express";

const login: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readByEmailWithPassword(req.body.email);

    if (users == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      users.hashed_password,
      req.body.password,
    );

    if (verified) {
      const { hashed_password, ...userWithoutHashedPassword } = users;
      const myPayload: JwtPayload = {
        sub: users.id.toString(),
      };

      const token = jwt.sign(myPayload, process.env.APP_SECRET as string, {
        expiresIn: "1h",
      });

      res.json({
        user: userWithoutHashedPassword,
        token,
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;
    console.log(req.body.password);
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

export default { login, hashPassword, verifyToken };
