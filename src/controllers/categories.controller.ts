import { Request, Response } from "express";
import { iCategoryRequest } from "../interfaces/categories.interface";
import { createCategoryService } from "../services/categories/createCategory.service";
import { listAllCategoriesService } from "../services/categories/listAllCategories.service";
import { listCategoryRealEstateService } from "../services/categories/listCategoryRealEstate.service";

export const createCategoryController = async (
	request: Request,
	response: Response
) => {
	const categoryData: iCategoryRequest = request.body;

	const newCategory = await createCategoryService(categoryData);

	return response.status(201).json(newCategory);
};

export const listAllCategoriesController = async (
	request: Request,
	response: Response
) => {
	const allCategories = await listAllCategoriesService();

	return response.json(allCategories);
};

export const listCategoryRealEstateController = async (
	request: Request,
	response: Response
) => {
	const idCategory: number = parseInt(request.params.id)

	const categoryRealEstate = await listCategoryRealEstateService(idCategory);

	return response.json(categoryRealEstate);
};