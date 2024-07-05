import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {createVacancy} from "../api";
import {vacancyQueryKeys} from "./vacancy.queries";

export const useCreateVacancy = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createVacancy,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: vacancyQueryKeys._def,
			});
		},
	});

	return {
		createVacancy: mutateAsync,
		...mutation,
	};
};
