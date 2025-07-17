import type { RequestHandler } from "express";
import companyRepository from "./companyRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCompany = {
      name: req.body.name,
      siret: req.body.siret,
      users_id: req.body.users_id,
    };

    const insertId = await companyRepository.create(newCompany);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default add;
