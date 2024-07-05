import {useMutation} from "@tanstack/react-query";

import {reviewLesson} from "../api/review-lesson";
import {lessonQueryKeys} from "./lesson.queries";

export const useReviewLesson = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationKey: lessonQueryKeys["review-lesson"].queryKey,
		mutationFn: reviewLesson,
	});

	return {
		reviewLesson: mutateAsync,
		...mutation,
	};
};
