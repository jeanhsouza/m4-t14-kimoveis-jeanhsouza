import { z } from "zod";
import { scheduleSchema } from "../schemas/schedules.schema";

export type iSchedule = z.infer<typeof scheduleSchema>

