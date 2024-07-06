import {useMutation} from "@tanstack/react-query";

import {createCourse} from "../api";
import {invalidateCourseQueries} from "./course.queries";

export const useCreateCourse = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createCourse,
		onSuccess: () => {
			invalidateCourseQueries();
		},
	});

	return {
		createCourse: mutateAsync,
		...mutation,
	};
};
