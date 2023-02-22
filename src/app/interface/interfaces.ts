import { Request } from "express";

export interface IUserShape {
    name: string;
    email: string;
    password: string;
    id?: number;
}

export interface IPropertyShape {
    name: string;
    propertyId: string;
    isAvailable: boolean;
    city: string;
    street: string;
    registeredBy?: Omit<IUserShape, "password">
    id?: number;
}

export interface IFormatProperty extends Omit<IPropertyShape, "street" | "city"> {
    address: {
        city: string;
        street: string;
    },
    registeredBy: {
        name: string;
        email: string;
        id: number;
    },
}

export interface IUserRequestResponse {
    dataValues: IUserShape;
}

export interface ICustomRequest extends Request {
    user?: any;
}
