import {useMutation} from "@tanstack/react-query";

import {invalidateCourseQueries} from "@features/cms/admin";

import {createLesson} from "../api";
import {invalidateLessonQueries} from "./lesson.queries";

export const useCreateLesson = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createLesson,
		onSuccess: () => {
			invalidateLessonQueries();
			invalidateCourseQueries;
		},
	});

	return {
		createLesson: mutateAsync,
		...mutation,
	};
};
