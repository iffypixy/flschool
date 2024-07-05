import {useQuery} from "@tanstack/react-query";

import {vacancyQueryKeys} from "./vacancy.queries";
import {GetVacancyDto, getVacancy} from "../api";

export const useVacancy = (req: GetVacancyDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: vacancyQueryKeys["get-vacancy"](req).queryKey,
		queryFn: async () => {
			const res = await getVacancy(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
