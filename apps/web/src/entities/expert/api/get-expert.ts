import {Dto, apiClient} from "@shared/api";

import {Expert} from "../types";

export type GetExpertDto = Dto<
	string,
	{
		expert: Expert & {
			rating: number;
			students: number;
			courses: number;
		};
	}
>;

export const getExpert = (req: GetExpertDto["req"]) =>
	apiClient.get<GetExpertDto["res"]>(`/api/experts/${req}`);
