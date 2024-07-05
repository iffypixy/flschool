import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {deleteLesson} from "../api";
import {lessonQueryKeys} from "./lesson.queries";

export const useDeleteLesson = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteLesson,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: lessonQueryKeys._def,
			});
		},
	});

	return {
		deleteLesson: mutateAsync,
		...mutation,
	};
};
