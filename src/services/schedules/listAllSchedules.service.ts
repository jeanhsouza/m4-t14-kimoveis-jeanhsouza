import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

export const listAllSchedulesService = async (
	realEstateId: number
): Promise<any> => {
	const realEstateRepository: Repository<RealEstate> =
		AppDataSource.getRepository(RealEstate);

	const findSchedules = await realEstateRepository.findOne({
		relations: {
			address: true,
			category: true,
			schedules: {
				user: true,
			},
		},
		where: {
			id: realEstateId,
		},
	});

	if (!findSchedules) {
		throw new AppError("RealEstate not found", 404);
	}

	return findSchedules;
};
