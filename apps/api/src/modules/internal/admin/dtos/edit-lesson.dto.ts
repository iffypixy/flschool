import {Type} from "class-transformer";
import {IsArray, IsOptional, IsString, ValidateNested} from "class-validator";

class HomeworkTestQuestionDto {
	@IsString()
	text: string;

	@IsString({each: true})
	answers: string[];

	@IsString()
	correctAnswer: string;
}

class HomeworkDto {
	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => HomeworkTestQuestionDto)
	test?: HomeworkTestQuestionDto[];

	@IsOptional()
	@IsString()
	text?: string;
}

export class EditLessonDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	videoFileId?: string;

	@IsOptional()
	@IsString({each: true})
	topics?: string[];

	@IsOptional()
	@ValidateNested()
	@Type(() => HomeworkDto)
	homework?: HomeworkDto;
}
