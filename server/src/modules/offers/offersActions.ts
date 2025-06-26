import type { RequestHandler } from "express";
import offersRepository from "./offersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const offers = await offersRepository.readAll();
    res.json(offers);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const offerId = Number(req.params.id);
    const offer = await offersRepository.read(offerId);
    if (offer == null) {
      res.sendStatus(404);
    } else {
      res.json(offer);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newOffer = {
      id: Number(req.params.id),
      job_title: req.body.job_title,
      metier: req.body.metier,
      contract_type: req.body.contract_type,
      description: req.body.description,
      salary: req.body.salary,
      requierements: req.body.requierements,
      city_id: Number(req.params.city_id),
      company_id: Number(req.params.company_id),
    };

    const insertId = await offersRepository.create(newOffer);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// const edit: RequestHandler = async (req, res, next) => {
//   try {

//   } catch (err){
//     next(err);
//   }
// };

// const destroy: RequestHandler = async (req, res, next) => {
//   try {

//   } catch (err){
//     next(err);
//   }
// };

export default { browse, read, add };
