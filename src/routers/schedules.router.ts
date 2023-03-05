import { Router } from "express";
import {
	createScheduleController,
	listAllSchedulesController,
} from "../controllers/schedules.controllers";
import {
	ensureTokenUserAdminMiddleware,
	ensureValidTokenMiddleware,
	validateBodyMiddleware,
} from "../middlewares/kimoveis.middleware";
import { scheduleRequestSchema } from "../schemas/schedules.schema";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post(
	"",
	ensureValidTokenMiddleware,
	validateBodyMiddleware(scheduleRequestSchema),
	createScheduleController
);
scheduleRoutes.get(
	"/realEstate/:id",
	ensureTokenUserAdminMiddleware,
	listAllSchedulesController
);
