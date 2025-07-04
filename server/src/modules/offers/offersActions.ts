import type { RequestHandler } from "express";
import offersRepository from "./offersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const offers = await offersRepository.read();
    res.json(offers);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const offerId = Number(req.params.id);
    if (offerId == null) {
      res.status(400).json({ error: "Invalid offer ID" });
    }
    const offer = await offersRepository.read();
    if (!offer) {
      res.sendStatus(404);
    } else {
      res.json(offer);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newOffer = {
      jobTitle: req.body.jobTitle,
      metier: req.body.metier,
      contractType: req.body.contractType,
      description: req.body.description,
      salary: req.body.salary,
      requirements: req.body.requirements,
      city_id: Number(req.body.city_id),
      company_id: Number(req.body.company_id),
    };

    const insertId = await offersRepository.create(newOffer);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const modifyOffer = {
      id: Number(req.params.id),
      jobTitle: req.body.jobTitle,
      metier: req.body.metier,
      contractType: req.body.contractType,
      description: req.body.description,
      salary: req.body.salary,
      requirements: req.body.requirements,
      city_id: Number(req.body.city_id),
      company_id: Number(req.body.company_id),
    };
    const affectedRows = await offersRepository.update(modifyOffer);

    if (affectedRows == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const offerId = Number(req.params.id);
    await offersRepository.delete(offerId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
