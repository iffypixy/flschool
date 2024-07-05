import {useQuery} from "@tanstack/react-query";

import {alumnusQueryKeys} from "./alumnus.queries";
import {getAlumni} from "../api";

export const useAlumni = () => {
	const {data, ...query} = useQuery({
		queryKey: alumnusQueryKeys["get-alumni"].queryKey,
		queryFn: getAlumni,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
