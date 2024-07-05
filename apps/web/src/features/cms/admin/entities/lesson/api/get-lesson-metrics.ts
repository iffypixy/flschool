import {Course} from "@entities/course";
import {Lesson} from "@entities/lesson";
import {Dto, apiClient} from "@shared/api";

export type GetLessonMetricsDto = Dto<
	void,
	{
		metrics: Array<{
			id: Lesson["id"];
			name: Lesson["name"];
			course: {
				id: Course["id"];
				name: Course["name"];
			};
			rating: number;
			reviews: number;
		}>;
	}
>;

export const getLessonMetrics = () =>
	apiClient.get<GetLessonMetricsDto["res"]>(
		`/api/internal/admin/courses/lessons/reviews/metrics`,
	);
