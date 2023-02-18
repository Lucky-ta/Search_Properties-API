import { IUserShape } from "../interface";

export type IRequestResponse = {
    status: number;
    data: {
        message?: string;
        token?: string;
        user?: IUserShape;
    };
};

export interface ICreateUserResponse {
    status: number;
    data?: {
        message?: string;
        user?: Omit<IUserShape, "password">;
    };
}
