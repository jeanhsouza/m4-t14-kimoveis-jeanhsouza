import { z } from "zod";
import {
	realEstateResult,
	realEstateSchema,
} from "./realEstate.schema";
import { userSchema } from "./users.schema";

export const scheduleSchema = z.object({
	id: z.number(),
	date: z.string(),
	hour: z.string(),
	realEstate: realEstateSchema,
	user: userSchema,
});

export const scheduleRequestSchema = scheduleSchema
	.omit({
		id: true,
		realEstate: true,
		user: true,
	})
	.extend({
		realEstateId: z.number(),
	});

export const scheduleResultSchema = scheduleSchema.omit({ id: true });

export const scheduleRealEstateResultSchema = realEstateResult.extend({
	schedules: scheduleSchema.array(),
});
