import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {deleteVacancy} from "../api";
import {vacancyQueryKeys} from "./vacancy.queries";

export const useDeleteVacancy = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteVacancy,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: vacancyQueryKeys._def,
			});
		},
	});

	return {
		deleteVacancy: mutateAsync,
		...mutation,
	};
};
