import {useMutation} from "@tanstack/react-query";

import {invalidateCourseQueries} from "@features/cms/admin";

import {deleteLesson} from "../api";
import {invalidateLessonQueries} from "./lesson.queries";

export const useDeleteLesson = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteLesson,
		onSuccess: () => {
			invalidateCourseQueries();
			invalidateLessonQueries();
		},
	});

	return {
		deleteLesson: mutateAsync,
		...mutation,
	};
};
