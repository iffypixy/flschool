import {IsInt, IsString, Max, Min} from "class-validator";

export class ReviewCourseDto {
	@IsString()
	feedback: string;

	@IsInt()
	@Min(0)
	@Max(5)
	rating: number;
}
