import {useMutation} from "@tanstack/react-query";

import {setUseViewerQueryData} from "@entities/viewer";

import {authQueryKeys} from "./auth.queries";
import {logout} from "../api";

export const useLogout = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationKey: authQueryKeys.logout.queryKey,
		mutationFn: logout,
		onSuccess: () => {
			setUseViewerQueryData(null);
		},
	});

	return {
		logout: mutateAsync,
		...mutation,
	};
};
