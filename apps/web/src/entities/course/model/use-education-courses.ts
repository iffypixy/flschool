import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {getEducationCourses} from "../api";

export const useEducationCourses = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-education-courses"].queryKey,
		queryFn: getEducationCourses,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
