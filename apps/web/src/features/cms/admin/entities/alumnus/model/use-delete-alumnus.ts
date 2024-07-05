import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {deleteAlumnus} from "../api";
import {alumnusQueryKeys} from "./alumnus.queries";

export const useDeleteAlumnus = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteAlumnus,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: alumnusQueryKeys._def,
			});
		},
	});

	return {
		deleteAlumnus: mutateAsync,
		...mutation,
	};
};
