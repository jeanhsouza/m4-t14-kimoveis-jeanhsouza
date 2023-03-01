import { z } from "zod"
import { allUserResultSchema, updatedUserSchema, userRequestSchema, userResultSchema, userSchema } from "../schemas/users.schema";

export type iUser = z.infer<typeof userSchema>;

export type iUserRequest = z.infer<typeof userRequestSchema>;

export type iUpdatedUser = z.infer<typeof updatedUserSchema>;

export type iUserResult = z.infer<typeof userResultSchema>;

export type iAllUsers = z.infer<typeof allUserResultSchema>;

