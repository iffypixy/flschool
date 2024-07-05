import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {deleteExpert} from "../api";
import {expertQueryKeys} from "./expert.queries";

export const useDeleteExpert = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteExpert,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: expertQueryKeys._def,
			});
		},
	});

	return {
		deleteExpert: mutateAsync,
		...mutation,
	};
};
