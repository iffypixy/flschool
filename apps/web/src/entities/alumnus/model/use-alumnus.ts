import {useQuery} from "@tanstack/react-query";

import {alumnusQueryKeys} from "./alumnus.queries";
import {GetAlumnusDto, getAlumnus} from "../api";

export const useAlumnus = (id: GetAlumnusDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: alumnusQueryKeys["get-alumnus"](id).queryKey,
		queryFn: async () => {
			const res = await getAlumnus(id);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
