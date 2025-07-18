import type { RequestHandler } from "express";
import userRepository from "../../modules/user/userRepository";

const verifyAdminRole: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth.sub);

    const user = await userRepository.read(userId);

    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }

    if (user.role_id !== 3) {
      res
        .status(403)
        .json({ message: "Accès refusé. Droits administrateur requis." });
      return;
    }

    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification des droits" });
  }
};

export { verifyAdminRole };
