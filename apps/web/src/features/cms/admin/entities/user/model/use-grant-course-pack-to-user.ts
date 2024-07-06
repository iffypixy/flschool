import {useMutation} from "@tanstack/react-query";

import {grantCoursePacksToUser} from "../api";
import {invalidateUserQueries} from "./user.queries";

export const useGrantCoursePackToUser = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: grantCoursePacksToUser,
		onSuccess: () => {
			invalidateUserQueries();
		},
	});

	return {
		grantCoursePacksToUser: mutateAsync,
		...mutation,
	};
};
