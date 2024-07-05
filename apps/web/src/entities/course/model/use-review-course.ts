import {useMutation} from "@tanstack/react-query";

import {reviewCourse} from "../api";

export const useReviewCourse = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: reviewCourse,
	});

	return {
		reviewCourse: mutateAsync,
		...mutation,
	};
};
