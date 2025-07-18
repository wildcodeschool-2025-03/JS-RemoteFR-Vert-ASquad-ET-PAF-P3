import type { RequestHandler } from "express";
import z from "zod";

const validateCompany: RequestHandler = (req, res, next) => {
  const { name, siret, users_id } = req.body;

  const companySchema = z.object({
    name: z.string().min(1).max(45),
    siret: z.string().min(1).max(45),
    users_id: z.number({ error: "Un utilisateur est requis" }),
  });

  const validData = companySchema.safeParse(req.body);

  if (!validData.success) {
    res.sendStatus(422).json({ Error: "Ces informations sont obligatoires." });
  } else {
    next();
  }
};

export default validateCompany;
