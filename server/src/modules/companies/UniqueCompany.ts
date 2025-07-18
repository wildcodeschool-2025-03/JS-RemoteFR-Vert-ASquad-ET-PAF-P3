import type { RequestHandler } from "express";
import companyRepository from "./companyRepository";

export const verifyUniqueCompany: RequestHandler = async (req, res, next) => {
  try {
    const { siret } = req.body;

    if (!siret) {
      res.status(422).json({ message: "Le champ siret est requis" });
      return;
    }
    const existingCompany = await companyRepository.findbySiret(siret);

    if (existingCompany) {
      res
        .status(409)
        .json({ message: "Votre entreprise existe déjà avec ce siret " });
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
};
