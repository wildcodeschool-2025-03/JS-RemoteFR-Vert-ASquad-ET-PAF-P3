import type { RequestHandler } from "express";
import CitiesRepository from "./CitiesRespository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const cities = await CitiesRepository.readAll();
    res.status(200).json(cities);
  } catch (err) {
    next(err);
  }
};

export default { browse };
