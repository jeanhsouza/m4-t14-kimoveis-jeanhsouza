import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iAllRealEstateResult, iRealEstateResult } from "../../interfaces/realEstate.interface";
import { allRealEstateResultSchema } from "../../schemas/realEstate.schema";

export const listAllRealEstatesService = async (): Promise<iAllRealEstateResult> => {  

	const realEstateRepository = AppDataSource.getRepository(RealEstate);
	
	const findRealEstates = await realEstateRepository.find({
		relations: {
			address: true
		}
	});

	console.log(findRealEstates)

	return findRealEstates;
};
