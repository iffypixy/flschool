import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {getAllLanguageCourses} from "../api";

export const useAllLanguageCourses = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-all-language-courses"].queryKey,
		queryFn: getAllLanguageCourses,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
