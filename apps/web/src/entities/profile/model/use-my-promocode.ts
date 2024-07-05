import {useQuery} from "@tanstack/react-query";

import {profileQueryKeys} from "./profile.queries";
import {getMyPromocode} from "../api";

export const useMyPromocode = () => {
	const {data, ...query} = useQuery({
		queryKey: profileQueryKeys["get-my-promocode"].queryKey,
		queryFn: getMyPromocode,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
