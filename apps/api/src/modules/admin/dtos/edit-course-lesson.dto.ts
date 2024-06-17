import {IsOptional, IsString} from "class-validator";

export class EditCourseLessonDto {
	@IsString()
	@IsOptional()
	name?: string;

	@IsString({
		each: true,
	})
	@IsOptional()
	topics?: string[];
}
