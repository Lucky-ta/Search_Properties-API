import { IUserRequestResponse } from "../../interface";

export const omitPassword = (user: IUserRequestResponse) => {
    const { password: passwordHash, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
};
