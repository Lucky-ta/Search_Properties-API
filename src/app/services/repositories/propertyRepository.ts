import { IPropertyShape, IUserShape } from "../../interface";

import { Property } from "../../../db/models";

class PropertyRepository {
    async create(
        property: IPropertyShape,
        user: IUserShape
    ): Promise<IPropertyShape | null> {
        return await Property.create({ ...property, registeredBy: user.id });
    }

    async edit(
        property: Omit<IPropertyShape, "registeredBy">,
        propertyId: number,
    ): Promise<IPropertyShape | null> {
        const [rowsAffected] = await Property.update(property, { where: { id: propertyId } });

        if (rowsAffected === 0) {
            return null;
        }

        const updatedProperty = await Property.findByPk(propertyId);
        return updatedProperty?.toJSON() as IPropertyShape;
    }
}

export default new PropertyRepository();
