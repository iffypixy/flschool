import {useQuery} from "@tanstack/react-query";

import {GetCourseDto, getCourse} from "../api";
import {courseQueryKeys} from "./course.queries";

export const useCourse = (req: GetCourseDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-course"](req).queryKey,
		queryFn: async () => {
			const res = await getCourse(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
