import type { RequestHandler } from "express";
import userRepository from "../../modules/user/userRepository";

const verifyAdminRole: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth.sub);

    const user = await userRepository.read(userId);

    if (!user) {
      res.sendStatus(401);
      return;
    }

    if (user.role_id !== 3) {
      res.sendStatus(403);
      return;
    }

    next();
  } catch (err) {
    res.sendStatus(500);
  }
};

export { verifyAdminRole };
