import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {createAlumnus} from "../api";
import {alumnusQueryKeys} from "./alumnus.queries";

export const useCreateAlumnus = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createAlumnus,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: alumnusQueryKeys._def,
			});
		},
	});

	return {
		createAlumnus: mutateAsync,
		...mutation,
	};
};
