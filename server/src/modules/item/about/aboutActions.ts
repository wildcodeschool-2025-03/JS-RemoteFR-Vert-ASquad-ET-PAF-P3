import type { RequestHandler } from "express";
import aboutRepository from "./aboutRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const abouts = await aboutRepository.readAll();
    res.json(abouts);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const insertId = Number(req.params.id);
    const about = await aboutRepository.read(insertId);
    if (about == null) {
      res.sendStatus(404);
    } else {
      res.send(about);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const about = {
      id: Number(req.params.id),
      title: req.body.title,
      paragraph: req.body.paragraph,
    };
    const affectedRows = await aboutRepository.update(about);

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
    const newabout = {
      title: req.body.title,
      paragraph: req.body.paragraph,
    };
    const insert = await aboutRepository.create(newabout);
    res.status(201).json({ insert });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const aboutId = Number(req.params.id);
    await aboutRepository.delete(aboutId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
