import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import {
	iRealEstateRequest,
	iRealEstateResult,
} from "../../interfaces/realEstate.interface";
import {
	addressSchema,
	realEstateSchema,
} from "../../schemas/realEstate.schema";

export const createRealEstateService = async (
	realEstateData: iRealEstateRequest
): Promise<iRealEstateResult> => {
	const realEstateRepository: Repository<RealEstate> =
		AppDataSource.getRepository(RealEstate);
	const categoryRepository: Repository<Category> =
		AppDataSource.getRepository(Category);
	const addressRepository: Repository<Address> =
		AppDataSource.getRepository(Address);

	let addressFull = null;
	let categoryFull = null;

	if (realEstateData.address.number) {
		const findAddress = await addressRepository.findOneBy({
			street: realEstateData.address.street,
			city: realEstateData.address.city,
			number: realEstateData.address.number,
			zipCode: realEstateData.address.zipCode,
			state: realEstateData.address.state,
		});

		if (findAddress) {
			throw new AppError("Address already exists", 409);
		}
	}

	const address: Address = addressRepository.create(realEstateData.address);

	await addressRepository.save(address);

	const newAddress = addressSchema.parse(address);

	addressFull = newAddress;

	if (realEstateData.categoryId) {
		const findCategory = await categoryRepository.findOne({
			where: {
				id: realEstateData.categoryId,
			},
		});

		if (findCategory) {
			categoryFull = findCategory;
		}
	}

	const onlyRealEstate = {
		value: realEstateData.value,
		size: realEstateData.size,
		address: addressFull,
		category: { ...categoryFull },
	};

	const realEstate: RealEstate = realEstateRepository.create(onlyRealEstate);

	await realEstateRepository.save(realEstate);

	const newRealEstate = realEstateSchema.parse(realEstate);

	const newRealEstateFull: iRealEstateResult = {
		...newRealEstate,
		address: addressFull,
		category: categoryFull!,
	};

	return newRealEstateFull;
};
