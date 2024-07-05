import {useQuery} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";
import {Nullable} from "@shared/lib/types";

import {viewerQueryKeys} from "./viewer.queries";
import {GetViewerDto, getViewer} from "../api";

const map = (res: GetViewerDto["res"]) => ({
	viewer: res.credentials,
});

export const useViewer = () => {
	const {data, ...query} = useQuery({
		queryKey: viewerQueryKeys["get-viewer"].queryKey,
		queryFn: async () => {
			const res = await getViewer();

			return map(res.data);
		},

		retryOnMount: false,
	});

	return {
		isAuthenticated: !!data?.viewer,
		...data,
		...query,
	};
};

export const setUseViewerQueryData = <T = Nullable<GetViewerDto["res"]>>(
	viewer: T,
) => {
	queryClient.setQueryData<{
		viewer: T;
	}>(viewerQueryKeys["get-viewer"].queryKey, {
		viewer,
	});
};
