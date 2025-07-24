import type { RequestHandler } from "express";

import RoleRepository from "./roleRepository";

// Helper function to validate and parse role ID
function parseRoleId(idParam: string): number {
  const id = Number.parseInt(idParam, 10);

  if (Number.isNaN(id) || id <= 0) {
    throw new Error("Invalid role ID: must be a positive number");
  }

  return id;
}

const browse: RequestHandler = async (req, res, next) => {
  try {
    const roles = await RoleRepository.readAll();

    res.status(200).json(roles);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const roleId = parseRoleId(req.params.id);

    const role = await RoleRepository.read(roleId);

    if (role == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(role);
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes("Invalid role ID")) {
      res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const roleId = parseRoleId(req.params.id);

    const role = {
      id: roleId,
      label: req.body.label,
      color: req.body.color,
    };

    const affectedRows = await RoleRepository.update(role);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes("Invalid role ID")) {
      res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newRole = {
      label: req.body.label,
      color: req.body.color || "#FFFFFF",
    };

    const insertId = await RoleRepository.create(newRole);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const roleId = parseRoleId(req.params.id);

    const affectedRows = await RoleRepository.delete(roleId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes("Invalid role ID")) {
      res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
};

export default { browse, read, edit, add, destroy };
