import {useQuery} from "@tanstack/react-query";

import {expertQueryKeys} from "./expert.queries";
import {getAllExperts} from "../api";

export const useAllExperts = () => {
	const {data, ...query} = useQuery({
		queryKey: expertQueryKeys["get-all-experts"].queryKey,
		queryFn: getAllExperts,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
