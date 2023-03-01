import { z } from "zod";
import { allCategoryResultSchema, categoryRequestSchema, categorySchema } from "../schemas/categories.schema";

export type iCategory = z.infer<typeof categorySchema>;

export type iCategoryRequest = z.infer<typeof categoryRequestSchema>

export type iAllCategoryResult = z.infer<typeof allCategoryResultSchema>