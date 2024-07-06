import {useMutation} from "@tanstack/react-query";

import {deleteCourse} from "../api";
import {invalidateCourseQueries} from "./course.queries";

export const useDeleteCourse = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteCourse,
		onSuccess: () => {
			invalidateCourseQueries();
		},
	});

	return {
		deleteCourse: mutateAsync,
		...mutation,
	};
};
