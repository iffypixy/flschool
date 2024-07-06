import {useMutation} from "@tanstack/react-query";

import {grantCoursesToUser} from "../api";
import {invalidateUserQueries} from "./user.queries";

export const useGrantCoursesToUser = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: grantCoursesToUser,
		onSuccess: () => {
			invalidateUserQueries();
		},
	});

	return {
		grantCoursesToUser: mutateAsync,
		...mutation,
	};
};
