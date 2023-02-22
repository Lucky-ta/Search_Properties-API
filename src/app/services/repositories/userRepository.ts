import { IUserShape } from "../../interface";

import { User, Property } from "../../../db/models";

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
        await User.update(data, { where: { id: userId } });

        const updatedUser = await User.findByPk(userId);
        return updatedUser?.toJSON() as IUserShape;
    }

    async exclude(userId: number) {
        await Property.destroy({ where: { registeredBy: userId } });
        return await User.destroy({ where: { id: userId } });
    }
}

export default new UserRepository();
