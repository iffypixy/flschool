import {Course} from "@entities/course";
import {Dto, apiClient} from "@shared/api";

export type GetAllCoursesDto = Dto<
	void,
	{
		courses: Array<
			Course & {
				lessons: number;
			}
		>;
	}
>;

export const getAllCourses = () =>
	apiClient.get<GetAllCoursesDto["res"]>("/api/internal/admin/courses");
