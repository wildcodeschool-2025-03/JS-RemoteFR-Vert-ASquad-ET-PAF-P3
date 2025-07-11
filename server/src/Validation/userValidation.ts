import type { RequestHandler } from "express";
import { password } from "payload/dist/fields/validations";
import z from "zod";
import Users from "../types/UserType";

const validateUser: RequestHandler = (req, res, next) => {
  const {
    email,
    hashed_password,
    firstname,
    lastname,
    address,
    number,
    picture_src,
    picture_alt,
    document,
    role_id,
  } = req.body;

  const userSchema = z.object({
    email: z
      .string()
      .regex(
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
      ),
    hashed_password: z.string().min(8),
    firstname: z.string().min(2).max(45).optional(),
    lastname: z.string().min(2).max(45).optional(),
    address: z.string().min(2).max(45).optional(),
    number: z.string().min(2).max(45).optional(),
    picture_src: z.string().min(2).optional(),
    picture_alt: z.string().min(2).optional(),
    document: z.string(),
    role_id: z.number(),
  });

  // const validData: RequestHandler = async (req, res,next) => {
  //  try{
  //   await userSchema.safeParse({
  //     email,
  //   hashed_password,
  //   firstname,
  //   lastname,
  //   address,
  //   number,
  //   picture_src,
  //   picture_alt,
  //   document,
  //   role_id
  // });
  // next();
  // }
  // catch(error){
  //   if(!validData){
  //     const error = validData.;
  //     res.status(401).json(error);
  //     return;
  // }}
  // }
};
