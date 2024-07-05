import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {editCourse} from "../api";
import {courseQueryKeys} from "./course.queries";

export const useEditCourse = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editCourse,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: courseQueryKeys._def,
			});
		},
	});

	return {
		editCourse: mutateAsync,
		...mutation,
	};
};
