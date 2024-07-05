import {Dto, apiClient} from "@shared/api";

import {Course} from "../types";

export type GetPopularCoursesDto = Dto<
	void,
	{
		courses: Array<
			Course & {
				lessons: number;
			}
		>;
	}
>;

export const getPopularCourses = () =>
	apiClient.get<GetPopularCoursesDto["res"]>("/api/courses/popular");
