import { Request, Response } from "express";

import { PropertyService } from "../services";

import { handleError } from "../utils";
import { ICustomRequest } from "../interface";
import { PropertyRepository } from "../services/repositories";

class PropertyController {
    private service: PropertyService;

    constructor(service: PropertyService) {
        this.service = service;
        this.createProperty = this.createProperty.bind(this);
        this.editProperty = this.editProperty.bind(this);
        this.deleteProperty = this.deleteProperty.bind(this);
        this.getProperty = this.getProperty.bind(this);
        this.getAllProperties = this.getAllProperties.bind(this);
    }

    async createProperty(req: ICustomRequest, res: Response) {
        try {
            const { body, user } = req;
            const { status, data } = await this.service.create(body, user);
            return res.status(status).send(data);
        } catch (error) {
            handleError(res, error);
        }
    };

    async editProperty(req: ICustomRequest, res: Response) {
        try {
            const { propertyId } = req.params;
            const { body, user } = req;
            const { status, data } = await this.service.edit(body, user, propertyId);
            return res.status(status).send(data);
        } catch (error) {
            handleError(res, error);
        }

    };
    async deleteProperty(req: Request, res: Response) { };
    async getProperty(req: Request, res: Response) { };
    async getAllProperties(req: Request, res: Response) { };
}

export default new PropertyController(new PropertyService(PropertyRepository));