import {useMutation} from "@tanstack/react-query";
import {z} from "zod";

import {uploadFile} from "../api";

export const fileSchema = z.object({
	id: z.string(),
	name: z.string(),
	url: z.string(),
});

export const useUploadFile = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: uploadFile,
	});

	return {
		uploadFile: mutateAsync,
		...mutation,
	};
};
