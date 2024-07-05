import {Course} from "@entities/course";
import {Dto, apiClient} from "@shared/api";

export type SearchCoursesDto = Dto<
	{
		query: string;
	},
	{
		courses: Course[];
	}
>;

export const searchCourses = (req: SearchCoursesDto["req"]) =>
	apiClient.get<SearchCoursesDto["res"]>(
		"/api/internal/admin/courses/search",
		{
			params: req,
		},
	);
