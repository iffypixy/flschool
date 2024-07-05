import {CourseLanguage, CourseType} from "@prisma/client";
import {IsIn, IsInt, IsOptional, IsString} from "class-validator";

export class EditCourseDto {
	@IsOptional()
	@IsString()
	authorId?: string;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	hook?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsIn([CourseLanguage.EN, CourseLanguage.RU, CourseLanguage.KZ])
	language?: CourseLanguage;

	@IsOptional()
	@IsInt()
	duration?: string;

	@IsOptional()
	@IsString({
		each: true,
	})
	audience?: string[];

	@IsOptional()
	@IsIn([CourseType.EDUCATION, CourseType.FL_TEENS, CourseType.LANGUAGE])
	type?: CourseType;

	@IsOptional()
	@IsString()
	previewFileId?: string;

	@IsInt()
	@IsOptional()
	price?: string;
}
