import {Course} from "@entities/course";
import {Dto, apiClient} from "@shared/api";

export type GetAllLanguageCoursesDto = Dto<
	void,
	{
		courses: {
			id: Course["id"];
			name: Course["name"];
		}[];
	}
>;

export const getAllLanguageCourses = () =>
	apiClient.get<GetAllLanguageCoursesDto["res"]>(
		"/api/internal/admin/courses/language",
	);
