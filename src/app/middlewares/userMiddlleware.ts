import { z } from "zod";
import { Request, Response, NextFunction } from "express";


const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    createUserSchema.parse(body);
    return next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

