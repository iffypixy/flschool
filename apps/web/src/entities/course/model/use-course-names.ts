import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {getCourseNames} from "../api";

export const useCourseNames = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-course-names"].queryKey,
		queryFn: getCourseNames,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
