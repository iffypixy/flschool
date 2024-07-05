import {Course, CourseType} from "@entities/course";
import {Language} from "@entities/language";
import {Dto, apiClient} from "@shared/api";

export type CreateCourseDto = Dto<
	{
		type: CourseType;
		name: string;
		language: Language;
		price?: number;
		audience: string[];
		hook: string;
		duration: number;
		description: string;
		previewFileId: string;
		authorId: string;
	},
	{
		course: Course;
	}
>;

export const createCourse = (req: CreateCourseDto["req"]) =>
	apiClient.post<CreateCourseDto["res"]>("/api/internal/admin/courses", req);
