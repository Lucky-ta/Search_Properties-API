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

    async edit(data: Omit<IUserShape, "password">, userId: number): Promise<IUserShape | null> {
        const [rowsAffected] = await User.update(data, { where: { id: userId } });
        if (rowsAffected === 0) {
            return null;
        }

        const updatedUser = await User.findByPk(userId);
        return updatedUser?.toJSON() as IUserShape;
    }

    async exclude(userId: number) {
        return await User.destroy({ where: { id: userId } });
    }
}

export default new UserRepository();
