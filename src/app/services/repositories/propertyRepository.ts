import { IPropertyShape, IUserShape } from "../../interface";

import { Property } from "../../../db/models";

class PropertyRepository {
    async create(property: IPropertyShape, user: IUserShape): Promise<IPropertyShape | null> {
        return await Property.create({ ...property, registeredBy: user.id });
    }
}

export default new PropertyRepository();
