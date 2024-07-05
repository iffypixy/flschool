import {useQuery} from "@tanstack/react-query";

import {vacancyQueryKeys} from "./vacancy.queries";
import {getVacancies} from "../api";

export const useVacancies = () => {
	const {data, ...query} = useQuery({
		queryKey: vacancyQueryKeys["get-vacancies"].queryKey,
		queryFn: getVacancies,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
