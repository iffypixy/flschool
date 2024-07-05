import {useQuery} from "@tanstack/react-query";

import {lessonQueryKeys} from "./lesson.queries";
import {GetLessonDto, getLesson} from "../api";

export const useLesson = (req: GetLessonDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: lessonQueryKeys["get-lesson"](req).queryKey,
		queryFn: async () => {
			const res = await getLesson(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
