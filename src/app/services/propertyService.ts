import { IPropertyShape, IUserShape } from "../interface";
import { IRequestResponse } from "./interfaces";

import { formatProperty } from "../utils/formatData";

import { PropertyRepository } from "./repositories";


require("dotenv").config();

class PropertyService {
    constructor(private readonly propertyRepository: typeof PropertyRepository) { }

    async create(newProperty: IPropertyShape, user: IUserShape): Promise<IRequestResponse> {
        const createdProperty = await this.propertyRepository.create(newProperty, user)

        if (!createdProperty) {
            return {
                status: 400,
                data: { message: "Error on property creation" }
            }
        }

        const property = formatProperty(createdProperty, user);

        return {
            status: 201,
            data: { property },
        };

    }

    // async edit(updatedProperty: IPropertyShape): Promise<IRequestResponse> { }

    // async exclude(propertyId: number): Promise<IRequestResponse> { }

    // async getOne(propertyId: number): Promise<IRequestResponse> { }

    // async getAll(userId: number): Promise<IRequestResponse> { }
}

export default PropertyService;
