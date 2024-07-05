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
	test: HomeworkTestQuestionDto[];

	@IsOptional()
	@IsString()
	text: string;
}

export class CreateLessonDto {
	@IsString()
	name: string;

	@IsString()
	videoFileId: string;

	@IsString({each: true})
	topics: string[];

	@ValidateNested()
	@Type(() => HomeworkDto)
	homework: HomeworkDto;
}
