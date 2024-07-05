import {Dto, apiClient} from "@shared/api";

export type DeleteCourseDto = Dto<string, void>;

export const deleteCourse = (req: DeleteCourseDto["req"]) =>
	apiClient.delete<DeleteCourseDto["res"]>(
		`/api/internal/admin/courses/${req}`,
	);
