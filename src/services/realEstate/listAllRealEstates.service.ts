import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iAllRealEstateResult } from "../../interfaces/realEstate.interface";

export const listAllRealEstatesService =
	async (): Promise<iAllRealEstateResult> => {
		const realEstateRepository: Repository<RealEstate> =
			AppDataSource.getRepository(RealEstate);

		const findRealEstates = await realEstateRepository.find({
			relations: {
				address: true,
			},
		});

		return findRealEstates;
	};
