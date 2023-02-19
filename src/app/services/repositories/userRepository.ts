import { IUserShape } from "../../interface";

import { User } from "../../../db/models";
import { hashPassword } from "../bcrypt/bcryptFunctions";

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

    async edit(data: IUserShape, userId: number): Promise<IUserShape | null> {
        const hashedPassword = await hashPassword(data.password);

        const [rowsAffected] = await User.update({ ...data, password: hashedPassword }, { where: { id: userId } });
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
