import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {getAllCourses} from "../api";

export const useAllCourses = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-all-courses"].queryKey,
		queryFn: getAllCourses,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
