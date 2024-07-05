import {useQuery} from "@tanstack/react-query";

import {alumnusQueryKeys} from "./alumnus.queries";
import {getAllAlumni} from "../api";

export const useAllAlumni = () => {
	const {data, ...query} = useQuery({
		queryKey: alumnusQueryKeys["get-all-alumni"].queryKey,
		queryFn: getAllAlumni,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
