import { Request, Response } from "express";
import { iScheduleRequest } from "../interfaces/schedules.interface";
import { createScheduleService } from "../services/schedules/createSchedule.service";
import { listAllSchedulesService } from "../services/schedules/listAllSchedules.service";

export const createScheduleController = async (
	request: Request,
	response: Response
) => {
	const scheduleData: iScheduleRequest = request.body;

	const authToken: any = request.headers.authorization;

	const token: string = authToken.split(" ")[1];

	const newSchedule = await createScheduleService(scheduleData, token);

	return response.status(201).json(newSchedule);
};

export const listAllSchedulesController = async (
	request: Request,
	response: Response
) => {
	const realEstateId: number = parseInt(request.params.id);

	const allSchedules = await listAllSchedulesService(realEstateId);

	return response.json(allSchedules);
};
