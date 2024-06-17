import {IsInt, Max, Min} from "class-validator";

export class ReviewCourseLessonDto {
	@IsInt()
	@Min(0)
	@Max(5)
	rating: number;
}
