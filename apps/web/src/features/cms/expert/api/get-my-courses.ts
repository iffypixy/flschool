import {Course} from "@entities/course";
import {Dto, apiClient} from "@shared/api";

export type GetMyCoursesDto = Dto<
	void,
	{
		courses: Array<
			Course & {
				students: number;
				pendingHwAnswers: number;
			}
		>;
	}
>;

export const getMyCourses = () =>
	apiClient.get<GetMyCoursesDto["res"]>("/api/internal/expert/courses");
