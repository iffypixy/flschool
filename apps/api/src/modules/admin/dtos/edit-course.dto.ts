import {CourseType} from "@prisma/client";
import {IsInt, IsOptional, IsString} from "class-validator";

export class EditCourseDto {
	@IsString()
	@IsOptional()
	expertId?: string;

	@IsString()
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	hook?: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsString()
	@IsOptional()
	language?: string;

	@IsInt()
	@IsOptional()
	completionPeriod?: number;

	@IsString({
		each: true,
	})
	@IsOptional()
	audience?: string[];

	@IsString()
	@IsOptional()
	type?: CourseType;

	@IsString()
	@IsOptional()
	preview?: string;

	@IsInt()
	@IsOptional()
	price?: number;
}
