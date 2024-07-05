import {Expert} from "@entities/expert";
import {Dto, apiClient} from "@shared/api";

export type GetExpertMetrics = Dto<
	void,
	{
		metrics: Array<{
			id: Expert["id"];
			firstName: Expert["firstName"];
			lastName: Expert["lastName"];
			rating: number;
			reviews: number;
		}>;
	}
>;

export const getExpertMetrics = () =>
	apiClient.get<GetExpertMetrics["res"]>(
		`/api/internal/admin/experts/reviews/metrics`,
	);
