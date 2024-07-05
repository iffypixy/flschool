import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {deleteCourse} from "../api";
import {courseQueryKeys} from "./course.queries";

export const useDeleteCourse = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteCourse,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: courseQueryKeys._def,
			});
		},
	});

	return {
		deleteCourse: mutateAsync,
		...mutation,
	};
};
