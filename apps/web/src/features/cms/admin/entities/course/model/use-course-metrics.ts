import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {getCourseMetrics} from "../api";

export const useCourseMetrics = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-course-metrics"].queryKey,
		queryFn: getCourseMetrics,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
