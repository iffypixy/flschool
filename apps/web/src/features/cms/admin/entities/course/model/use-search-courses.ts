import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {SearchCoursesDto, searchCourses} from "../api";

export const useSearchCourses = (req: SearchCoursesDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["search-courses"](req).queryKey,
		queryFn: async () => {
			const res = await searchCourses(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
