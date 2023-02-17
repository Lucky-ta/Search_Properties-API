import jwt from 'jsonwebtoken';

import { IUserShape } from '../../interface';

const generateToken = (user: IUserShape) => {
    const token: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
    });

    return token;
};

export { generateToken };
