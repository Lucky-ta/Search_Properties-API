import { IUserShape } from "../../interface";

const User = require("../../../db/models");

export class UserRepository {
    async findByEmail(email: string) {
        return User.findOne({
            where: { email },
        });
    }

    async create(data: IUserShape) {
        return User.create(data);
    }
}