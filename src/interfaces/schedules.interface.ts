import { z } from "zod";
import {
	scheduleRealEstateResultSchema,
	scheduleRequestSchema,
	scheduleResultSchema,
	scheduleSchema,
} from "../schemas/schedules.schema";

export type iSchedule = z.infer<typeof scheduleSchema>;

export type iScheduleRequest = z.infer<typeof scheduleRequestSchema>;

export type iScheduleResult = z.infer<typeof scheduleResultSchema>;

export type iAllSchedulesRealEstateResult = z.infer<
	typeof scheduleRealEstateResultSchema
>;
