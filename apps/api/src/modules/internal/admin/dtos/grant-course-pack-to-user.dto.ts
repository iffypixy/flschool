import {CourseType} from "@prisma/client";
import {IsIn} from "class-validator";

export class GrantCoursePackToUserDto {
	@IsIn([CourseType.FL_TEENS, CourseType.EDUCATION, CourseType.LANGUAGE], {
		each: true,
	})
	packs: CourseType[];
}
