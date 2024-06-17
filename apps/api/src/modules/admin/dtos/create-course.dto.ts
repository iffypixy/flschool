import {CourseType} from "@prisma/client";
import {IsInt, IsOptional, IsString} from "class-validator";

export class CreateCourseDto {
	@IsString()
	expertId: string;

	@IsString()
	name: string;

	@IsString()
	hook: string;

	@IsString()
	description: string;

	@IsString()
	language: string;

	@IsInt()
	completionPeriod: number;

	@IsString({
		each: true,
	})
	audience: string[];

	@IsString()
	type: CourseType;

	@IsString()
	preview: string;

	@IsInt()
	@IsOptional()
	price?: number;
}
