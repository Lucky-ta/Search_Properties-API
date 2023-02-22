import { IPropertyShape, IUserShape } from "../../interface";

import { Property, User } from "../../../db/models";

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
    ): Promise<IPropertyShape | null> {
        return await Property.findAll({
            where: { registeredBy: userId },
            attributes: { exclude: ["registeredBy"] },
            include: [
                {
                    model: User,
                    required: true,
                    as: 'registeredByUser', // add alias here
                    attributes: ["name", "email", "id"],
                },
            ],
        });
    }

    async findAll(): Promise<IPropertyShape[] | null> {
        return await Property.findAll({
            attributes: { exclude: ["registeredBy"] },
            include: [
                {
                    model: User,
                    required: true,
                    as: 'registeredByUser', // add alias here
                    attributes: ["name", "email", "id"],
                },
            ],
        });
    }
}

export default new PropertyRepository();
