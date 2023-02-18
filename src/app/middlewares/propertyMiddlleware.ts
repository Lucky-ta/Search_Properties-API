import { NextFunction, Request, Response } from "express";

import { propertySchema } from "./zodSchemas";

export const validateProperty = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        propertySchema.parse(body);
        return next();
    } catch (error) {
        return res.status(400).send(error.issues[0].message);
    }
}