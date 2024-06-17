import {IsInt, IsOptional, IsString, Max, Min} from "class-validator";

export class LeaveAnswerFeedbackDto {
	@IsOptional()
	@IsString()
	comment?: string;

	@IsInt()
	@Min(0)
	@Max(5)
	rating: number;
}
