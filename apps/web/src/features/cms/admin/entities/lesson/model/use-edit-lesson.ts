import {useMutation} from "@tanstack/react-query";

import {invalidateCourseQueries} from "@features/cms/admin";

import {editLesson} from "../api";
import {invalidateLessonQueries} from "./lesson.queries";

export const useEditLesson = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editLesson,
		onSuccess: () => {
			invalidateCourseQueries();
			invalidateLessonQueries();
		},
	});

	return {
		editLesson: mutateAsync,
		...mutation,
	};
};
