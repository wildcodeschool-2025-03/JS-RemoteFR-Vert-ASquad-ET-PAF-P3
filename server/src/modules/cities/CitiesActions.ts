import type { RequestHandler } from "express";
import CitiesRepository from "./CitiesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const cities = await CitiesRepository.readAll();
    res.json(cities);
  } catch (err) {
    next(err);
  }
};

export default { browse };
