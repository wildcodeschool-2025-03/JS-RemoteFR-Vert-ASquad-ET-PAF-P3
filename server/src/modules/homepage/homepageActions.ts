import type { RequestHandler } from "express";
//BREAD
import homepageRepository from "../homepage/homepageRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const homes = await homepageRepository.readAll();
    res.json(homes);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const insertId = Number(req.params.id);
    const homes = await homepageRepository.read(insertId);
    if (homes == null) {
      res.sendStatus(404);
    } else {
      res.send(homes);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const home = {
      id: Number(req.params.id),
      title: req.body.title,
      paragraphe: req.body.paragraphe,
    };
    const affectedRows = await homepageRepository.update(home);

    if (affectedRows == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newhomepage = {
      title: req.body.title,
      paragraphe: req.body.paragraphe,
    };
    const insert = await homepageRepository.create(newhomepage);
    res.status(201).json({ insert });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const homeId = Number(req.params.id);
    await homepageRepository.delete(homeId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
