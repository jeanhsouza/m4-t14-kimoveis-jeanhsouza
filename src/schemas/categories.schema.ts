import { z } from "zod";
import { realEstateSchema } from "./realEstate.schema";

export const categorySchema = z.object({
    id: z.number(),
    name: z.string().max(45)
})

export const categoryRealEstateSchema = categorySchema.extend({
    realEstate: realEstateSchema.array()
})

export const categoryRequestSchema = categorySchema.omit({id: true})

export const allCategoryResultSchema = categorySchema.array()