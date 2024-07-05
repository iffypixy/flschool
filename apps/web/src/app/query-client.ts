import {QueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 3,
		},
		mutations: {
			onError: () => {
				toast.error("Произошла ошибка.");
			},
		},
	},
});
