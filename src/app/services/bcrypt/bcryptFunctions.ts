import { compare, hash } from 'bcrypt';

const validatePassword = async (password: string, hashPassword: string)
    : Promise<boolean> => {
    return await compare(password, hashPassword);
};

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const response = await hash(password, saltRounds);
    return response;
};

export {
    validatePassword,
    hashPassword,
};