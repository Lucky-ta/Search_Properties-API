import { IFormatProperty, IUserShape } from "../interface";

export type IRequestResponse = {
    status: number;
    data: {
        message?: string;
        token?: string;
        user?: IUserShape | Omit<IUserShape, "password">;
        property?: IFormatProperty;
        properties?: IFormatProperty[];
    };
};
