import { Router } from "express";
import {
	createRealEstateController,
	listAllRealEstatesController,
} from "../controllers/realEstate.controller";
import {
	ensureTokenUserAdminMiddleware,
	validateBodyMiddleware,
} from "../middlewares/kimoveis.middleware";
import { realEstateRequestSchema } from "../schemas/realEstate.schema";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
	"",
	ensureTokenUserAdminMiddleware,
	validateBodyMiddleware(realEstateRequestSchema),
	createRealEstateController
);
realEstateRoutes.get("", listAllRealEstatesController);
