import {useMutation} from "@tanstack/react-query";

import {submitHomeworkAnswerFeedback} from "../api";

export const useSubmitHomeworkAnswerFeedback = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: submitHomeworkAnswerFeedback,
	});

	return {
		submitHomeworkAnswerFeedback: mutateAsync,
		...mutation,
	};
};
