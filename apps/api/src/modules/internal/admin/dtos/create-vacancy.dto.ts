import {EmploymentType, ModalityType, RequiredExperience} from "@prisma/client";
import {IsArray, IsIn, IsInt, IsString} from "class-validator";

export class CreateVacancyDto {
	@IsString()
	position: string;

	@IsString()
	company: string;

	@IsInt()
	salary: string;

	@IsString()
	link: string;

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
	employmentType: EmploymentType[];

	@IsArray()
	@IsIn([ModalityType.ON_SITE, ModalityType.REMOTE, ModalityType.HYBRID], {
		each: true,
	})
	modalityType: ModalityType[];

	@IsIn([
		RequiredExperience.NONE,
		RequiredExperience.ONE_TO_THREE_YEARS,
		RequiredExperience.THREE_TO_FIVE_YEARS,
		RequiredExperience.FIVE_AND_MORE_YEARS,
	])
	requiredExperience: RequiredExperience;
}
