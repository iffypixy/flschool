import {useMutation} from "@tanstack/react-query";

import {submitConsultationRequest} from "../api";

export const useSubmitConsultationRequest = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: submitConsultationRequest,
	});

	return {
		submitConsultationRequest: mutateAsync,
		...mutation,
	};
};
