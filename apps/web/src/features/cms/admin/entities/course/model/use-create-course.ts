import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {createCourse} from "../api";
import {courseQueryKeys} from "./course.queries";

export const useCreateCourse = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createCourse,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: courseQueryKeys._def,
			});
		},
	});

	return {
		createCourse: mutateAsync,
		...mutation,
	};
};
