import {useMutation} from "@tanstack/react-query";

import {setUseViewerQueryData} from "@entities/viewer";

import {authQueryKeys} from "./auth.queries";
import {signUp} from "../api";

export const useSignUp = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationKey: authQueryKeys["sign-up"].queryKey,
		mutationFn: signUp,
		onSuccess: (res) => {
			setUseViewerQueryData(res.data.credentials);
		},
	});

	return {
		signUp: mutateAsync,
		...mutation,
	};
};
