import { Router } from "express";

import { propertyController } from "../controllers";

import { tokenValidation, validateProperty } from "../middlewares";

const propertyRouter = Router();

propertyRouter.post("/", tokenValidation, validateProperty, propertyController.createProperty);
propertyRouter.patch("/:propertyId", tokenValidation, validateProperty, propertyController.editProperty);

export { propertyRouter };