import { IUserShape } from "../../interface";

import { User } from "../../../db/models";

class UserRepository {
    constructor() {
        this.findByEmail = this.findByEmail.bind(this);
        this.create = this.create.bind(this);
    }

    async findByEmail(email: string) {
        return User.findOne({
            where: { email },
        });
    }

    async findById(userId: number) {
        return User.findByPk(userId);
    }

    async create(data: IUserShape) {
        return User.create(data);
    }

    async edit(data: IUserShape, userId: number) {
        return User.update(data, { where: { id: userId } })
    }
}

export default new UserRepository();
