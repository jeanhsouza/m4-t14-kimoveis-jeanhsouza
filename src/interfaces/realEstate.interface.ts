import { z } from "zod";
import { addressRequestSchema, addressSchema, allRealEstateResultSchema, realEstateRequestSchema, realEstateResult, realEstateResultWithoutCategory, realEstateSchema, updatedRealEstateSchema } from "../schemas/realEstate.schema";

export type iAddress = z.infer<typeof addressSchema>;

export type iAddressRequest = z.infer<typeof addressRequestSchema>

export type iRealEstate = z.infer<typeof realEstateSchema>;

export type iRealEstateRequest = z.infer<typeof realEstateRequestSchema>

export type iUpdatedRealEstate = z.infer<typeof updatedRealEstateSchema>

export type iRealEstateResult = z.infer<typeof realEstateResult>

export type iRealEstateWithoutCategoryResult = z.infer<typeof realEstateResultWithoutCategory>

export type iAllRealEstateResult = z.infer<typeof allRealEstateResultSchema>
