import type { RequestHandler } from "express";
import userRepository from "../modules/user/userRepository";

export const verifyCompanyRole: RequestHandler = async (req, res, next) => {
  try {
    const companyId = Number(req.auth.sub);

    const company = await userRepository.read(companyId);

    if (company?.role_id !== 2) {
      res.sendStatus(403);
      return;
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
