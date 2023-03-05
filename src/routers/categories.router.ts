import { Router } from "express";
import {
	createCategoryController,
	listAllCategoriesController,
	listCategoryRealEstateController,
} from "../controllers/categories.controller";
import {
	ensureTokenUserAdminMiddleware,
	validateBodyMiddleware,
} from "../middlewares/kimoveis.middleware";
import { categoryRequestSchema } from "../schemas/categories.schema";

export const categoryRoutes: Router = Router();

categoryRoutes.post(
	"",
	ensureTokenUserAdminMiddleware,
	validateBodyMiddleware(categoryRequestSchema),
	createCategoryController
);
categoryRoutes.get("", listAllCategoriesController);
categoryRoutes.get("/:id/realEstate", listCategoryRealEstateController);
