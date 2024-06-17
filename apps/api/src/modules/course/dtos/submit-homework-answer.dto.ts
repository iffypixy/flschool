import {IsObject, IsOptional, IsString} from "class-validator";

export class SubmitHomeworkAnswerDto {
	@IsOptional()
	@IsString()
	text: string;

	@IsOptional()
	@IsString()
	file: string;

	@IsOptional()
	@IsObject()
	answers: Record<string, string>;
}
