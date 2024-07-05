import {useQuery} from "@tanstack/react-query";

import {userQueryKeys} from "./user.queries";
import {getAllUsers} from "../api";

export const useAllUsers = () => {
	const {data, ...query} = useQuery({
		queryKey: userQueryKeys["get-all-users"].queryKey,
		queryFn: getAllUsers,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
