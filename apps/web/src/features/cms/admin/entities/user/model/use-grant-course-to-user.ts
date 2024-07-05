import {useMutation} from "@tanstack/react-query";

import {grantCoursesToUser} from "../api";

export const useGrantCoursesToUser = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: grantCoursesToUser,
	});

	return {
		grantCoursesToUser: mutateAsync,
		...mutation,
	};
};
