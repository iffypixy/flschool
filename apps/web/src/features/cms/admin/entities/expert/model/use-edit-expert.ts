import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {editExpert} from "../api";
import {expertQueryKeys} from "./expert.queries";

export const useEditExpert = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editExpert,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: expertQueryKeys._def,
			});
		},
	});

	return {
		editExpert: mutateAsync,
		...mutation,
	};
};
