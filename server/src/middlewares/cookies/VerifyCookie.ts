import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { MyPayload } from "../../types/express";

export const verifyCookie: RequestHandler = async (req, res, next) => {
  try {
    const ValidCookie = req.cookies.access_token;

    if (!ValidCookie) {
      res.status(401).json({ message: "Cookie not valid" });
      return;
    }
    req.auth = jwt.verify(
      ValidCookie,
      process.env.APP_SECRET as string,
    ) as MyPayload;
    next();
  } catch (err) {
    res.status(401);
  }
};
