import {Dto, apiClient} from "@shared/api";

export type ReviewLessonDto = Dto<
	{
		courseId: string;
		lessonId: string;
		rating: number;
	},
	void
>;

export const reviewLesson = (req: ReviewLessonDto["req"]) =>
	apiClient.post<ReviewLessonDto["res"]>(
		`/api/courses/${req.courseId}/lessons/${req.lessonId}/reviews`,
		req,
	);
