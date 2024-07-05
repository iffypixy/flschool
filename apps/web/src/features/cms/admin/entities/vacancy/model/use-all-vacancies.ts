import {useQuery} from "@tanstack/react-query";

import {vacancyQueryKeys} from "./vacancy.queries";
import {getAllVacancies} from "../api";

export const useAllVacancies = () => {
	const {data, ...query} = useQuery({
		queryKey: vacancyQueryKeys["get-all-vacancies"].queryKey,
		queryFn: getAllVacancies,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
