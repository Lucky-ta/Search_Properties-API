import { Response } from "express";

interface IErrorShape {
    message: string;
}

export const handleError = (res: Response, error: IErrorShape) => {
    return res.status(500).send(error.message);
};