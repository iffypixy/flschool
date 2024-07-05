import {useQuery} from "@tanstack/react-query";

import {expertQueryKeys} from "./expert.queries";
import {getExpertMetrics} from "../api";

export const useExpertMetrics = () => {
	const {data, ...query} = useQuery({
		queryKey: expertQueryKeys["get-expert-metrics"].queryKey,
		queryFn: getExpertMetrics,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
