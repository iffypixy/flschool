import {Dto, apiClient} from "@shared/api";

import {Course} from "../types";

export type GetLanguageCoursesDto = Dto<
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

export const getLanguageCourses = () =>
	apiClient.get<GetLanguageCoursesDto["res"]>("/api/courses/language");
