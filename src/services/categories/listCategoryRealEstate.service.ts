import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { iCategoryRealEstateResult } from "../../interfaces/categories.interface";

export const listCategoryRealEstateService = async (idCategory : number): Promise<iCategoryRealEstateResult> => {  

	const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
	
	const findRealEstate = await categoryRepository.findOne({
		relations:{
			realEstate: true
		},
		where:{
			id:idCategory
		}
	});

	if(!findRealEstate){
		throw new AppError("Category not found", 404)
	}


	return findRealEstate;
};
