import { z } from "zod"
import { categorySchema } from "./categories.schema"

export const addressSchema = z.object({
    id: z.number(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(6).nullish(),
    city: z.string().max(20),
    state: z.string().max(2)
})

export const addressRequestSchema = addressSchema.omit({
    id: true
})

export const realEstateSchema = z.object({
    id: z.number(),
    value: z.number().multipleOf(0.01).positive(),
    size: z.number().int().positive(),
    sold: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const realEstateRequestSchema = realEstateSchema.omit({id: true, createdAt: true, updatedAt: true})

export const updatedRealEstateSchema = realEstateRequestSchema.partial()

export const realEstateResult = realEstateSchema.extend({
    address: addressSchema.nullish(),
    category: categorySchema.nullish()
})

export const allRealEstateResultSchema = realEstateResult.array()