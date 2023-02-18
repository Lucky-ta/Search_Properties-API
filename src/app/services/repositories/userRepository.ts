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

    async create(data: IUserShape) {
        return User.create(data);
    }
}

export default new UserRepository();
