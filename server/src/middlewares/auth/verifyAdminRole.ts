import type { RequestHandler } from "express";
import userRepository from "../../modules/user/userRepository";

const verifyAdminRole: RequestHandler = async (req, res, next) => {
  try {
    // Get user ID from the JWT payload (set by verifyToken middleware)
    const userId = Number(req.auth.sub);

    // Get user from database to check role
    const user = await userRepository.read(userId);

    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }

    // Check if user has admin role (id: 3)
    if (user.role_id !== 3) {
      res
        .status(403)
        .json({ message: "Accès refusé. Droits administrateur requis." });
      return;
    }

    // User is admin, continue
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification des droits" });
  }
};

export { verifyAdminRole };
