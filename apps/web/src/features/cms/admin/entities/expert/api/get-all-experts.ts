import {Expert} from "@entities/expert";
import {Dto, apiClient} from "@shared/api";

export type GetAllExpertsDto = Dto<
	void,
	{
		experts: Expert[];
	}
>;

export const getAllExperts = () =>
	apiClient.get<GetAllExpertsDto["res"]>("/api/internal/admin/experts");
