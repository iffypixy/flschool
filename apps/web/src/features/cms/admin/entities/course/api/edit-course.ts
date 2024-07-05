import {Course, CourseType} from "@entities/course";
import {Language} from "@entities/language";
import {Dto, apiClient} from "@shared/api";

export type EditCourseDto = Dto<
	{
		id: string;
		type?: CourseType;
		name?: string;
		language?: Language;
		price?: number;
		audience?: string[];
		hook?: string;
		duration?: number;
		description?: string;
		previewFileId?: string;
		authorId?: string;
	},
	{
		course: Course;
	}
>;

export const editCourse = (req: EditCourseDto["req"]) =>
	apiClient.put<EditCourseDto["res"]>(
		`/api/internal/admin/courses/${req.id}`,
		req,
	);
