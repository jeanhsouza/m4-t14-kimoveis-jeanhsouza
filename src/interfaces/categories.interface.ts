import { z } from "zod";
import {
	allCategoryResultSchema,
	categoryRealEstateSchema,
	categoryRequestSchema,
	categorySchema,
} from "../schemas/categories.schema";

export type iCategory = z.infer<typeof categorySchema>;

export type iCategoryRequest = z.infer<typeof categoryRequestSchema>;

export type iCategoryRealEstateResult = z.infer<
	typeof categoryRealEstateSchema
>;

export type iAllCategoryResult = z.infer<typeof allCategoryResultSchema>;
