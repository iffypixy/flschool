import {Dto, apiClient} from "@shared/api";

import {Course} from "../types";

export type GetEducationCoursesDto = Dto<
	void,
	{
		courses: Array<
			Course & {
				rating: number;
				reviews: number;
			}
		>;
	}
>;

export const getEducationCourses = () =>
	apiClient.get<GetEducationCoursesDto["res"]>("/api/courses/education");
