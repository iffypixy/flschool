import {CourseLanguage, CourseType} from "@prisma/client";
import {IsIn, IsInt, IsOptional, IsString} from "class-validator";

export class CreateCourseDto {
	@IsString()
	authorId: string;

	@IsString()
	name: string;

	@IsString()
	hook: string;

	@IsString()
	description: string;

	@IsIn([CourseLanguage.EN, CourseLanguage.RU, CourseLanguage.KZ])
	language: CourseLanguage;

	@IsInt()
	duration: number;

	@IsString({
		each: true,
	})
	audience: string[];

	@IsIn([CourseType.EDUCATION, CourseType.FL_TEENS, CourseType.LANGUAGE])
	type: CourseType;

	@IsString()
	previewFileId: string;

	@IsInt()
	@IsOptional()
	price?: number;
}
