import { IFormatProperty, IPropertyShape, IUserShape } from "../../interface";

export function formatProperty(
    createdProperty: IPropertyShape,
    user: Omit<IUserShape, "password">
): IFormatProperty {
    return {
        name: createdProperty.name,
        propertyId: createdProperty.propertyId,
        isAvailable: createdProperty.isAvailable,
        address: {
            city: createdProperty.city,
            street: createdProperty.street,
        },
        registeredBy: {
            name: user.name,
            email: user.email,
            id: user.id
        },
        id: createdProperty.id,
    };
}
