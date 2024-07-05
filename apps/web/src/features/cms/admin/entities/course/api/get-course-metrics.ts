import {Course} from "@entities/course";
import {Dto, apiClient} from "@shared/api";

export type GetCourseMetricsDto = Dto<
	void,
	{
		metrics: Array<{
			id: Course["id"];
			name: Course["name"];
			rating: number;
			reviews: number;
		}>;
	}
>;

export const getCourseMetrics = () =>
	apiClient.get<GetCourseMetricsDto["res"]>(
		"/api/internal/admin/courses/reviews/metrics",
	);
