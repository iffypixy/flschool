import {Dto, apiClient} from "@shared/api";

import {Course} from "../types";

export type GetCourseNames = Dto<
	void,
	{
		courses: {
			id: Course["id"];
			name: Course["name"];
		}[];
	}
>;

export const getCourseNames = () =>
	apiClient.get<GetCourseNames["res"]>("/api/courses/names");
