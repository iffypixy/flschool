import {IsInt, IsString} from "class-validator";

export class ReviewCourseDto {
	@IsString()
	comment: string;

	@IsInt()
	rating: number;

	@IsString()
	expertComment: string;

	@IsInt()
	expertRating: number;
}
