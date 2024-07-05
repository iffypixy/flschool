import {Expert} from "@entities/expert";
import {Dto, apiClient} from "@shared/api";

export type SearchExpertsDto = Dto<
	{
		query: string;
	},
	{
		experts: Expert[];
	}
>;

export const searchExperts = (req: SearchExpertsDto["req"]) =>
	apiClient.get<SearchExpertsDto["res"]>(
		"/api/internal/admin/experts/search",
		{
			params: req,
		},
	);
