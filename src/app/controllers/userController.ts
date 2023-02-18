import { Request, Response } from "express";

import { UserRepository } from "../services/repositories";
import { UserService } from "../services";

import { handleError } from "../utils";

class UserController {
    private service: UserService;

    constructor(service: UserService) {
        this.service = service;
        this.createUser = this.createUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async createUser(req: Request, res: Response) {
        try {
            const { body } = req;
            const { status, data } = await this.service.create(body);
            return res.status(status).send(data);
        } catch (error: any) {
            handleError(res, error);
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { body } = req;
            const { status, data } = await this.service.login(body);
            return res.status(status).send(data);
        } catch (error) {
            handleError(res, error);
        }
    }

    async editUser(req: Request, res: Response) {
        try {
            const { body } = req;
            const userId = Number(req.params.id);
            const { status, data } = await this.service.edit(body, userId);
            return res.status(status).send(data);
        } catch (error) {
            handleError(res, error);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const { status, data } = await this.service.exclude(userId);
            return res.status(status).send(data);
        } catch (error) {
            handleError(res, error);
        }
    }
}

export default new UserController(new UserService(UserRepository));