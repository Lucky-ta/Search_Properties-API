import { IUserShape } from "../../interface";

export const omitPassword = (user: IUserShape) => {
    const { password: passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
