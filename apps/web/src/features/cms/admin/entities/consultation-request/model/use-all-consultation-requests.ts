import {useQuery} from "@tanstack/react-query";

import {consultationRequestQueryKeys} from "./consultation-requests.queries";
import {getAllConsultationRequests} from "../api";

export const useAllConsultationRequests = () => {
	const {data, ...query} = useQuery({
		queryKey:
			consultationRequestQueryKeys["get-all-consultation-requests"]
				.queryKey,
		queryFn: getAllConsultationRequests,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
