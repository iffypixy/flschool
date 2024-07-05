import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {getFreelanceTeensCourses} from "../api";

export const useFreelanceTeensCourses = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-freelance-teens-courses"].queryKey,
		queryFn: getFreelanceTeensCourses,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
