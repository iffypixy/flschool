import {IsInt} from "class-validator";

export class ReviewLessonDto {
	@IsInt()
	rating: string;
}
