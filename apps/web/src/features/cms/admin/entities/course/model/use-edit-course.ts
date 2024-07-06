import {useMutation} from "@tanstack/react-query";

import {editCourse} from "../api";
import {invalidateCourseQueries} from "./course.queries";

export const useEditCourse = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editCourse,
		onSuccess: () => {
			invalidateCourseQueries();
		},
	});

	return {
		editCourse: mutateAsync,
		...mutation,
	};
};
