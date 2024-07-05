import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./expert.queries";
import {GetPendingHomeworkAnswersDto, getPendingHomeworkAnswers} from "../api";

export const usePendingHomeworkAnswers = (
	req: GetPendingHomeworkAnswersDto["req"],
) => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-pending-homework-answers"](req).queryKey,
		queryFn: async () => {
			const res = await getPendingHomeworkAnswers(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
