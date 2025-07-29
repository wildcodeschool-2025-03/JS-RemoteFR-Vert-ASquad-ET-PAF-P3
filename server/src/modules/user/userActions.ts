import type { RequestHandler } from "express";
import type User from "../../types/UserType";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.status(200).json(users);
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
      res.status(200).json(user);
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

    // Format the data to handle null values
    const formattedMembers = members.map((member) => ({
      id: member.id,
      firstname: member.firstname,
      lastname: member.lastname,
      email: member.email,
      role_label: member.role_label || "Non défini",
      company_name: member.company_name || "Non renseigné",
      company_siret: member.company_siret || "Non renseigné",
    }));

    res.status(200).json(formattedMembers);
  } catch (err) {
    next(err);
  }
};

const browseAllCandidats: RequestHandler = async (req, res, next) => {
  try {
    const members = await userRepository.readAllWithCompanyAndRole();

    // Format the data to handle null values
    const formattedMembers = members.map((member) => ({
      id: member.id,
      firstname: member.firstname,
      lastname: member.lastname,
      email: member.email,
      role_label: member.role_label || "Non défini",
      company_name: member.company_name || "Non renseigné",
      company_siret: member.company_siret || "Non renseigné",
    }));

    res.status(200).json(formattedMembers);
  } catch (err) {
    next(err);
  }
};

const readAllmembers: RequestHandler = async (req, res, next) => {
  try {
    const { type } = req.query;

    let users: User[] = [];
    if (type === "members") {
      users = await userRepository.readByUserbytype("members");
    } else {
      users = await userRepository.readAll();
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, browseMembers, readAllmembers };
