import {Dto, apiClient} from "@shared/api";

export type ReviewCourseDto = Dto<
	{
		id: string;
		rating: number;
		comment: string;
		expertRating: number;
		expertComment: string;
	},
	void
>;

export const reviewCourse = ({id, ...req}: ReviewCourseDto["req"]) =>
	apiClient.post<ReviewCourseDto["res"]>(`/api/courses/${id}/reviews`, req);
