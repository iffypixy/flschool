import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {editAlumnus} from "../api";
import {alumnusQueryKeys} from "./alumnus.queries";

export const useEditAlumnus = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editAlumnus,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: alumnusQueryKeys._def,
			});
		},
	});

	return {
		editAlumnus: mutateAsync,
		...mutation,
	};
};
