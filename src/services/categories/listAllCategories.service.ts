import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCategory } from "../../interfaces/categories.interface";
import { allCategoryResultSchema } from "../../schemas/categories.schema";

export const listAllCategoriesService = async (): Promise<iCategory[]> => {  

	const categoryRepository = AppDataSource.getRepository(Category);
	
	const findCategories = await categoryRepository.find({});

	const allCategories = allCategoryResultSchema.parse(findCategories);	

	return allCategories;
};
