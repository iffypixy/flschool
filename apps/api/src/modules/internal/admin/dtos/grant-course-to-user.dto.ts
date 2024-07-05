import {IsString} from "class-validator";

export class GrantCourseToUserDto {
	@IsString({each: true})
	courseIds: string[];
}
