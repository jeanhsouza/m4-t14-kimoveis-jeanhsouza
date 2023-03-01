import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { categoryRoutes, loginRoute, realEstateRoutes, scheduleRoutes, usersRoutes } from "./routers";


const app: Application = express();
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/login', loginRoute);
app.use('/categories', categoryRoutes);
app.use('/realEstate', realEstateRoutes);
app.use('/schedules', scheduleRoutes);

app.use(handleErrors);

export default app;