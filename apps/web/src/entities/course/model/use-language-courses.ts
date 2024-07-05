import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {getLanguageCourses} from "../api";

export const useLanguageCourses = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-language-courses"].queryKey,
		queryFn: getLanguageCourses,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
