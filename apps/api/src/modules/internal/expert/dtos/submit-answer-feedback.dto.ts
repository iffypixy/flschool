import {IsInt, IsOptional, IsString} from "class-validator";

export class SubmitAnswerFeedbackDto {
	@IsInt()
	rating: string;

	@IsOptional()
	@IsString()
	comment?: string;
}
