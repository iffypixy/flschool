import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {createLesson} from "../api";
import {lessonQueryKeys} from "./lesson.queries";

export const useCreateLesson = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createLesson,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: lessonQueryKeys._def,
			});
		},
	});

	return {
		createLesson: mutateAsync,
		...mutation,
	};
};
