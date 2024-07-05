import {Dto, apiClient} from "@shared/api";

import {Viewer} from "../types";

export type GetViewerDto = Dto<
	void,
	{
		credentials: Viewer;
	}
>;

export const getViewer = () =>
	apiClient.get<GetViewerDto["res"]>("/api/auth/local/credentials");
