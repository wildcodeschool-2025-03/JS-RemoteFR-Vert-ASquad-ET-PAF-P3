import type { RequestHandler } from "express";
import companyRepository from "./companyRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const company = await companyRepository.readAll();
    res.status(200).json(company);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const companies = Number(req.params.id);
    const company = await companyRepository.readAll();

    if (company == null) {
      res.sendStatus(401);
    } else {
      res.status(200).json(companies);
    }
  } catch (err) {
    next(err);
  }
};

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
    res.sendStatus(409);
  }
};

export default { browse, read, add };
