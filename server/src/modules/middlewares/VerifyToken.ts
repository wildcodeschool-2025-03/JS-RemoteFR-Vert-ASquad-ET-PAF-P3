import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { MyPayload } from "../../types/express";

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    let token: string | undefined;
    if (req.cookies?.access_token) {
      token = req.cookies.access_token;
    } else if (req.get("Authorization")?.split(" ")) {
      throw new Error("Authorization header is missing");
    }

    if (!token) {
      throw new Error("Token not found");
    }
    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

export { verifyToken };
