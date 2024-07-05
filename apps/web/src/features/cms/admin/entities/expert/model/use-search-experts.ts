import {useQuery} from "@tanstack/react-query";

import {expertQueryKeys} from "./expert.queries";
import {SearchExpertsDto, searchExperts} from "../api/search-experts";

export const useSearchExperts = (req: SearchExpertsDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: expertQueryKeys["search-experts"](req).queryKey,
		queryFn: async () => {
			const res = await searchExperts(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
