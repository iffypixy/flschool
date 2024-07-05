import {useQuery} from "@tanstack/react-query";

import {userQueryKeys} from "./user.queries";
import {GetUserDto, getUser} from "../api";

export const useUser = (req: GetUserDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: userQueryKeys["get-user"](req).queryKey,
		queryFn: async () => {
			const res = await getUser(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
