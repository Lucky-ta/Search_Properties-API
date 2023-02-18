import { Request, Response, NextFunction } from "express";

import { userSchema } from './zodSchemas'


export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    userSchema.parse(body);
    return next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

