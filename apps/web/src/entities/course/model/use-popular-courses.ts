import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {getPopularCourses} from "../api";

export const usePopularCourses = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-popular-courses"].queryKey,
		queryFn: getPopularCourses,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
