import {EmploymentType, ModalityType, RequiredExperience} from "@prisma/client";
import {IsArray, IsIn, IsInt, IsOptional, IsString} from "class-validator";

export class EditVacancyDto {
	@IsOptional()
	@IsString()
	position?: string;

	@IsOptional()
	@IsString()
	company?: string;

	@IsOptional()
	@IsInt()
	salary?: number;

	@IsOptional()
	@IsString()
	link?: string;

	@IsOptional()
	@IsArray()
	@IsIn(
		[
			EmploymentType.FULL_TIME,
			EmploymentType.PART_TIME,
			EmploymentType.INTERNSHIP,
		],
		{
			each: true,
		},
	)
	employmentType?: EmploymentType[];

	@IsOptional()
	@IsArray()
	@IsIn([ModalityType.ON_SITE, ModalityType.REMOTE, ModalityType.HYBRID], {
		each: true,
	})
	modalityType?: ModalityType[];

	@IsOptional()
	@IsIn([
		RequiredExperience.NONE,
		RequiredExperience.ONE_TO_THREE_YEARS,
		RequiredExperience.THREE_TO_FIVE_YEARS,
		RequiredExperience.FIVE_AND_MORE_YEARS,
	])
	requiredExperience?: RequiredExperience;
}
