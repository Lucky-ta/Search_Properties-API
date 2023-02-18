import { IUserShape } from "../../interface";

import { User } from "../../../db/models";

class UserRepository {
    constructor() { }

    async findByEmail(email: string) {
        return await User.findOne({
            where: { email },
        });
    }

    async findById(userId: number) {
        return await User.findByPk(userId);
    }

    async create(data: IUserShape) {
        return await User.create(data);
    }

    async edit(data: IUserShape, userId: number) {
        return await User.update(data, { where: { id: userId } })
    }

    async exclude(userId: number) {
        return await User.destroy({ where: { id: userId } });
    }
}

export default new UserRepository();
