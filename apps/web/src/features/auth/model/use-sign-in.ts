import {useMutation} from "@tanstack/react-query";

import {setUseViewerQueryData} from "@entities/viewer";

import {authQueryKeys} from "./auth.queries";
import {signIn} from "../api";

export const useSignIn = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationKey: authQueryKeys["sign-in"].queryKey,
		mutationFn: signIn,
		onSuccess: (res) => {
			setUseViewerQueryData(res.data.credentials);
		},
	});

	return {
		signIn: mutateAsync,
		...mutation,
	};
};
