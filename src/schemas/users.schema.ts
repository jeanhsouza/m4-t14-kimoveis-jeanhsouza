import { z } from 'zod'
import { hashSync } from 'bcryptjs'

export const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().default(false),
    password: z.string().min(4).max(20).transform((pass) => {
        return hashSync(pass, 10)
    }),    
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
})

export const userRequestSchema = userSchema.omit({id: true, createdAt: true, updatedAt: true, deletedAt: true})

export const updatedUserSchema = userRequestSchema.partial()

export const userResultSchema = userSchema.omit({password: true})

export const allUserResultSchema = userResultSchema.array()