import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    if (user == null) {
      res.sendStatus(401);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      number: req.body.number,
      picture_src: req.body.picture_src,
      picture_alt: req.body.picture_alt,
      document: req.body.document,
      role_id: req.body.role_id,
    };
    const insertId = await userRepository.create(newUser);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const editUser = {
      id: Number(req.params.id),
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      number: req.body.number,
      picture_src: req.body.picture_src,
      picture_alt: req.body.picture_alt,
      document: req.body.document,
      role_id: req.body.role_id,
    };
    const affectedRows = await userRepository.update(editUser);

    if (!affectedRows) {
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
    const userId = Number(req.params.id);
    await userRepository.delete(userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
