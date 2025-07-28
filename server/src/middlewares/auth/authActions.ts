import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../../modules/user/userRepository";

import type { JwtPayload } from "jsonwebtoken";
//
const login: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readByEmailWithPassword(req.body.email);

    if (!users) {
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
        role: users.role_id,
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
      res.status(200).json({
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
