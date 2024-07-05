import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {expertQueryKeys} from "./expert.queries";
import {createExpert} from "../api";

export const useCreateExpert = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createExpert,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: expertQueryKeys._def,
			});
		},
	});

	return {
		createExpert: mutateAsync,
		...mutation,
	};
};
