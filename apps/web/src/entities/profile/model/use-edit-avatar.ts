import {useMutation} from "@tanstack/react-query";

import {setUseViewerQueryData} from "@entities/viewer";

import {editAvatar} from "../api";

export const useEditAvatar = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editAvatar,
		onSuccess: (res) => {
			setUseViewerQueryData(res.data.credentials);
		},
	});

	return {
		editAvatar: mutateAsync,
		...mutation,
	};
};
