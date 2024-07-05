import {useQuery} from "@tanstack/react-query";

import {alumnusQueryKeys} from "./alumnus.queries";
import {GetAlumnusDto, getAlumnus} from "../api";

export const useAlumnus = (req: GetAlumnusDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: alumnusQueryKeys["get-alumnus"](req).queryKey,
		queryFn: async () => {
			const res = await getAlumnus(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
