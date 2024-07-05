import {useQuery} from "@tanstack/react-query";

import {expertQueryKeys} from "./expert.queries";
import {getExperts} from "../api";

export const useExperts = () => {
	const {data, ...query} = useQuery({
		queryKey: expertQueryKeys["get-experts"].queryKey,
		queryFn: getExperts,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
