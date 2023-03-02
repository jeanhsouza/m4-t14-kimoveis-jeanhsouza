import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import { validateBodyMiddleware } from "../middlewares/users.middleware";
import { loginRequestSchema } from "../schemas/login.schema";

export const loginRoute: Router = Router();

loginRoute.post("", validateBodyMiddleware(loginRequestSchema),createLoginController)