import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

import cookieParser from "cookie-parser";
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

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });
      res.sendStatus(200).json({
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

export default { login };
