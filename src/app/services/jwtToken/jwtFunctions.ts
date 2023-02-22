import jwt from "jsonwebtoken";

import { IUserShape } from "../../interface";

require("dotenv").config();

const generateToken = (user: IUserShape) => {
    const token: string = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
            algorithm: "HS256",
        }
    );

    return token;
};

export { generateToken };
