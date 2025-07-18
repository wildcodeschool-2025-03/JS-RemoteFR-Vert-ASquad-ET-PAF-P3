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
    const user = await userRepository.readByEmailWithPassword(req.params.id);

    if (user == null) {
      res.sendStatus(401);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res) => {
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
    res.status(409).json({ message: "Email déjà existant" });
  }
};

const browseMembers: RequestHandler = async (req, res, next) => {
  try {
    const members = await userRepository.readAllWithCompanyAndRole();
    res.json(members);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, browseMembers };
