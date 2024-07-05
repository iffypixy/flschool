import {useMutation} from "@tanstack/react-query";

import {editHomeworkAnswer} from "../api/edit-homework-answer";
import {lessonQueryKeys} from "./lesson.queries";

export const useEditHomeworkAnswer = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationKey: lessonQueryKeys["edit-homework-answer"].queryKey,
		mutationFn: editHomeworkAnswer,
	});

	return {
		editHomeworkAnswer: mutateAsync,
		...mutation,
	};
};
