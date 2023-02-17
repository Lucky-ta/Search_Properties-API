import { IUserShape } from "../interface";

export type ILoginResponse = {
    status: number;
    data: {
        message?: string;
        token?: string;
    };
};

export interface ICreateUserResponse {
    status: number;
    data: {
        message?: string;
        user?: Omit<IUserShape, "password">;
    };
}
