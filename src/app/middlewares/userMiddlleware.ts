import { Request, Response, NextFunction } from "express";

import { ICustomRequest } from "../interface";

import { userSchema, ediUserSchema } from './zodSchemas'

import jwt from 'jsonwebtoken';

require("dotenv").config();

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    userSchema.parse(body);
    return next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export const validateUpdatedUser = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  try {
    ediUserSchema.parse(body);
    return next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export const tokenValidation = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};