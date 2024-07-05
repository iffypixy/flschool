import {Dto, apiClient} from "@shared/api";

import {Expert} from "../types";

export type GetExpertsDto = Dto<
	void,
	{
		experts: Array<
			Expert & {
				rating: number;
				students: number;
				courses: number;
			}
		>;
	}
>;

export const getExperts = () =>
	apiClient.get<GetExpertsDto["res"]>("/api/experts");
