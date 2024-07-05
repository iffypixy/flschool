import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {editVacancy} from "../api";
import {vacancyQueryKeys} from "./vacancy.queries";

export const useEditVacancy = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editVacancy,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: vacancyQueryKeys._def,
			});
		},
	});

	return {
		editVacancy: mutateAsync,
		...mutation,
	};
};
