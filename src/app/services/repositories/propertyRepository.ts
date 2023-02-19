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
        propertyId: number
    ): Promise<IPropertyShape | null> {
        const [rowsAffected] = await Property.update(property, {
            where: { id: propertyId },
        });

        if (rowsAffected === 0) {
            return null;
        }

        const updatedProperty = await Property.findByPk(propertyId);
        return updatedProperty?.toJSON() as IPropertyShape;
    }

    async exclude(propertyId: number): Promise<0 | 1 | null> {
        return await Property.destroy({ where: { id: propertyId } });
    }

    async findAllByPk(
        userId: number
    ): Promise<Omit<IPropertyShape, "registeredBy">[] | null> {
        return await Property.findAll({
            where: { registeredBy: userId },
            exclude: ["registeredBy"],
        });
    }

    async findAll(): Promise<Omit<IPropertyShape, "registeredBy">[] | null> {
        return await Property.findAll({ exclude: ["registeredBy"] });
    }
}

export default new PropertyRepository();
