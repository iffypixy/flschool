import {useQuery} from "@tanstack/react-query";

import {expertQueryKeys} from "./expert.queries";
import {GetExpertDto, getExpert} from "../api";

export const useExpert = (req: GetExpertDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: expertQueryKeys["get-expert"](req).queryKey,
		queryFn: async () => {
			const res = await getExpert(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
