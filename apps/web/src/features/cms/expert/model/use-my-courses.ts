import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./expert.queries";
import {getMyCourses} from "../api";

export const useMyCourses = () => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-my-courses"].queryKey,
		queryFn: getMyCourses,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
