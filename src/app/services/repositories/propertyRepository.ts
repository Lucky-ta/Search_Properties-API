import { IPropertyShape, IUserShape } from "../../interface";

import { Property } from "../../../db/models";

class PropertyRepository {
    constructor() { }

    async create(property: IPropertyShape, user: IUserShape): Promise<IPropertyShape | null> {
        try {
            console.log(property, user)
            return await Property.create({ ...property, registeredBy: user.id });

        } catch (error) {
            console.log(error.message);

        }
    }
}

export default new PropertyRepository();
