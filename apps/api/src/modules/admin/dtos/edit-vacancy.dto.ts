import {EmploymentType, ModalityType, RequiredExperience} from "@prisma/client";
import {IsInt, IsOptional, IsString} from "class-validator";

export class EditVacancyDto {
	@IsString()
	@IsOptional()
	position?: string;

	@IsString()
	@IsOptional()
	company?: string;

	@IsString()
	@IsOptional()
	avatar?: string;

	@IsInt()
	@IsOptional()
	salary?: number;

	@IsString()
	@IsOptional()
	link?: string;

	@IsString({
		each: true,
	})
	@IsOptional()
	employmentType?: EmploymentType[];

	@IsString({
		each: true,
	})
	@IsOptional()
	modalityType?: ModalityType[];

	@IsString()
	@IsOptional()
	requiredExperience?: RequiredExperience;
}
