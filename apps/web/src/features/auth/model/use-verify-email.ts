import {useQuery} from "@tanstack/react-query";

import {authQueryKeys} from "./auth.queries";
import {VerifyEmailDto, verifyEmail} from "../api";

export const useVerifyEmail = (req: VerifyEmailDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: authQueryKeys["verify-email"](req).queryKey,
		queryFn: async () => {
			const res = await verifyEmail(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
