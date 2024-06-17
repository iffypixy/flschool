import {EmploymentType, ModalityType, RequiredExperience} from "@prisma/client";
import {IsInt, IsString} from "class-validator";

export class CreateVacancyDto {
	@IsString()
	position: string;

	@IsString()
	company: string;

	@IsString()
	avatar: string;

	@IsInt()
	salary: number;

	@IsString()
	link: string;

	@IsString({
		each: true,
	})
	employmentType: EmploymentType[];

	@IsString({
		each: true,
	})
	modalityType: ModalityType[];

	@IsString()
	requiredExperience: RequiredExperience;
}
