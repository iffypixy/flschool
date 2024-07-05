import {useQuery} from "@tanstack/react-query";

import {lessonQueryKeys} from "./lesson.queries";
import {getLessonMetrics} from "../api";

export const useLessonMetrics = () => {
	const {data, ...query} = useQuery({
		queryKey: lessonQueryKeys["get-lesson-metrics"].queryKey,
		queryFn: getLessonMetrics,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
