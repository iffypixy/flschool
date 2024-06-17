import {IsString} from "class-validator";

export class CreateCourseLessonDto {
	@IsString()
	name: string;

	@IsString({
		each: true,
	})
	topics: string[];

	@IsString()
	video: string;
}
