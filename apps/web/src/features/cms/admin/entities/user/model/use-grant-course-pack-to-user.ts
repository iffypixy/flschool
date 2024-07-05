import {useMutation} from "@tanstack/react-query";

import {grantCoursePacksToUser} from "../api";

export const useGrantCoursePackToUser = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: grantCoursePacksToUser,
	});

	return {
		grantCoursePacksToUser: mutateAsync,
		...mutation,
	};
};
