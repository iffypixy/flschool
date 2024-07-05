import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./expert.queries";
import {GetHomeworkAnswerDto, getHomeworkAnswer} from "../api";

export const useHomeworkAnswer = (req: GetHomeworkAnswerDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-homework-answer"](req).queryKey,
		queryFn: async () => {
			const res = await getHomeworkAnswer(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
