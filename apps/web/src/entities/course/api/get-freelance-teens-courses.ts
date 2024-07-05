import {Dto, apiClient} from "@shared/api";

import {Course} from "../types";

export type GetFreelanceTeensCoursesDto = Dto<
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

export const getFreelanceTeensCourses = () =>
	apiClient.get<GetFreelanceTeensCoursesDto["res"]>("/api/courses/fl-teens");
