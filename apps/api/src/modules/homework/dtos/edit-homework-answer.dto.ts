import {IsObject, IsOptional, IsString} from "class-validator";

export class EditHomeworkAnswerDto {
	@IsOptional()
	@IsString()
	text?: string;

	@IsOptional()
	@IsString()
	fileId?: string;

	@IsOptional()
	@IsObject()
	test?: Record<string, string>;
}
