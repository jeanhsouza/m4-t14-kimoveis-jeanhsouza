import { z } from 'zod'
import { hashSync } from 'bcryptjs'

export const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().default(false),
    password: z.string().max(20).transform((pass) => {
        return hashSync(pass, 10)
    }),    
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
})

export const userRequestSchema = userSchema.omit({id: true, createdAt: true, updatedAt: true, deletedAt: true})


export const userResultSchema = userSchema.omit({password: true})

export const updatedUserSchema = userRequestSchema.omit({admin: true})

export const updatedValidatedSchema = userRequestSchema.omit({admin: true}).extend({
    updatedAt: z.string()
}).partial()

export const allUserResultSchema = userResultSchema.array()