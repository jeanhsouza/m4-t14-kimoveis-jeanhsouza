import { AppDataSource } from "../../data-source";
import { User, RealEstate, Schedule } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { iScheduleRequest } from "../../interfaces/schedules.interface";
import { verify } from "jsonwebtoken";

export const createScheduleService = async (
	scheduleData: iScheduleRequest,
	token: string
): Promise<void> => {
	const createDateValid = new Date(`${scheduleData.date} ${scheduleData.hour}`);

	const verifyHour = createDateValid.getHours();
	const verifyDay = createDateValid.getDay();
	const verifyMinutes = createDateValid.getMinutes();

	if (verifyDay === 0 || verifyDay === 6) {
		throw new AppError("Invalid date, work days are monday to friday", 400);
	}

	if (verifyHour < 8 || verifyHour > 18) {
		throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
	}

	if (verifyHour >= 18 && verifyMinutes > 0) {
		throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
	}

	return verify(token, process.env.SECRET_KEY!, async (error, decoded: any) => {
		const userRepository: Repository<User> = AppDataSource.getRepository(User);
		const realEstateRepository: Repository<RealEstate> =
			AppDataSource.getRepository(RealEstate);
		const schedulesRepository: Repository<Schedule> =
			AppDataSource.getRepository(Schedule);

		const findRealEstate = await realEstateRepository.findOneBy({
			id: scheduleData.realEstateId,
		});

		if (!findRealEstate) {
			throw new AppError("RealEstate not found", 404);
		}

		const findUser = await userRepository.findOneBy({
			id: decoded.sub,
		});

		const newSchedule = {
			date: scheduleData.date,
			hour: scheduleData.hour,
			realEstate: findRealEstate!,
			user: findUser!,
		};

		const newSheduleCreated = schedulesRepository.create(newSchedule);

		// const findScheduleRealEstate = await schedulesRepository.findOneBy({
		// 	realEstate: {
		// 		id: newSheduleCreated.realEstate.id,
		// 	},
		// 	date: newSheduleCreated.date,
		// 	hour: newSheduleCreated.hour,
		// });

		const findScheduleRealEstate = await schedulesRepository
			.createQueryBuilder("schedule")
			.where("schedule.realEstateId = :id", {
				id: newSheduleCreated.realEstate.id,
			})
			.andWhere("schedule.date = :date", { date: newSheduleCreated.date })
			.andWhere("schedule.hour = :hour", { hour: newSheduleCreated.hour })
			.getOne();

		if (findScheduleRealEstate) {
			throw new AppError(
				"Schedule to this real estate at this date and time already exists",
				409
			);
		}

		// const findScheduleUser = await schedulesRepository.findOneBy({
		// 	date: newSheduleCreated.date,
		// 	hour: newSheduleCreated.hour,
		// 	user: {
		// 		id: newSheduleCreated.user.id,
		// 	},
		// });

		const findScheduleUser = await schedulesRepository
			.createQueryBuilder("schedule")
			.where("schedule.date = :date", { date: newSheduleCreated.date })
			.andWhere("schedule.hour = :hour", { hour: newSheduleCreated.hour })
			.andWhere("schedule.user.id = :userId", {
				userId: newSheduleCreated.user.id,
			})
			.getOne();

		if (findScheduleUser) {
			throw new AppError(
				"User schedule to this real estate at this date and time already exists",
				409
			);
		}

		await schedulesRepository.save(newSheduleCreated);

		return { message: "Schedule created" };
	});
};
