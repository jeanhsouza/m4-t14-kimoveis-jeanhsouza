import { Request, Response } from "express";
import { iRealEstateRequest } from "../interfaces/realEstate.interface";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";
import { listAllRealEstatesService } from "../services/realEstate/listAllRealEstates.service";

export const createRealEstateController = async (
	request: Request,
	response: Response
) => {
	const realEstateData: iRealEstateRequest = request.body;

	const newRealEstate = await createRealEstateService(realEstateData);

	return response.status(201).json(newRealEstate);
};

export const listAllRealEstatesController = async (
	request: Request,
	response: Response
) => {
	const allRealEstates = await listAllRealEstatesService();

	return response.json(allRealEstates);
};