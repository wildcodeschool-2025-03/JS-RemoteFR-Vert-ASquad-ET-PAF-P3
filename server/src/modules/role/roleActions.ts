import type { RequestHandler } from "express";

import RoleRepository from "./roleRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const roles = await RoleRepository.readAll();

    res.json(roles);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const roleId = Number.parseInt(req.params.id, 10);

    const role = await RoleRepository.read(roleId);

    if (role == null) {
      res.sendStatus(404);
    } else {
      res.json(role);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const roleId = Number.parseInt(req.params.id, 10);

    const role = {
      id: roleId,
      label: req.body.label,
    };

    const affectedRows = await RoleRepository.update(role);

    if (affectedRows === 0) {
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
    const newRole = {
      label: req.body.label,
    };

    const insertId = await RoleRepository.create(newRole);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const roleId = Number.parseInt(req.params.id, 10);

    const affectedRows = await RoleRepository.delete(roleId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
