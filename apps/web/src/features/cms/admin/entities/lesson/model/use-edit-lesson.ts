import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {editLesson} from "../api";
import {lessonQueryKeys} from "./lesson.queries";

export const useEditLesson = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editLesson,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: lessonQueryKeys._def,
			});
		},
	});

	return {
		editLesson: mutateAsync,
		...mutation,
	};
};
