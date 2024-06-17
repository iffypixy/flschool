import {EmploymentType, ModalityType, RequiredExperience} from "@prisma/client";
import {Type} from "class-transformer";
import {IsInt, IsOptional, IsString} from "class-validator";

import {PaginationDto} from "@lib/dtos";

export class GetVacanciesDto extends PaginationDto {
	@IsOptional()
	@IsString()
	positionQuery?: string;

	@IsOptional()
	@IsString()
	requiredExperience?: RequiredExperience;

	@IsOptional()
	@IsString({
		each: true,
	})
	modalityType?: ModalityType[];

	@IsOptional()
	@IsString({
		each: true,
	})
	employmentType?: EmploymentType[];

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	salaryFrom?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	salaryTo?: number;
}
