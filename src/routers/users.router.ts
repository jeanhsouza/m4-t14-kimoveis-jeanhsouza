import { Router } from "express";
import {
	createUserController,
	deleteUserController,
	listAllUserController,
	listOnlyUserController,
	updateUserController,
} from "../controllers/users.controller";
import {
	ensureTokenMiddleware,
	ensureTokenUserAdminMiddleware,
	validateBodyMiddleware,
	validateEmailExistsMiddleware,
	validateUserExistMiddleware,
} from "../middlewares/kimoveis.middleware";
import {
	updatedValidatedSchema,
	userRequestSchema,
} from "../schemas/users.schema";

export const usersRoutes: Router = Router();

usersRoutes.post(
	"",
	validateEmailExistsMiddleware,
	validateBodyMiddleware(userRequestSchema),
	createUserController
);
usersRoutes.get("", ensureTokenUserAdminMiddleware, listAllUserController);
usersRoutes.get(
	"/:id",
	validateUserExistMiddleware,
	ensureTokenMiddleware,
	listOnlyUserController
);
usersRoutes.patch(
	"/:id",
	validateUserExistMiddleware,
	ensureTokenMiddleware,
	validateBodyMiddleware(updatedValidatedSchema),
	validateEmailExistsMiddleware,
	updateUserController
);
usersRoutes.delete(
	"/:id",
	validateUserExistMiddleware,
	ensureTokenMiddleware,
	deleteUserController
);
