import {createQueryKeys} from "@lukemorales/query-key-factory";

import {queryClient} from "@app/query-client";

import {GetCourseDto, SearchCoursesDto} from "../api";

export const courseQueryKeys = createQueryKeys("cms/admin/course", {
	"get-all-courses": null,
	"get-course": (req: GetCourseDto["req"]) => [req],
	"get-course-metrics": null,
	"search-courses": (req: SearchCoursesDto["req"]) => [req.query],
	"get-all-language-courses": null,
});

export const invalidateCourseQueries = () => {
	queryClient.invalidateQueries({
		queryKey: courseQueryKeys._def,
	});
};
