import {Lesson} from "@entities/lesson";
import {Dto, apiClient} from "@shared/api";

export type CreateLessonDto = Dto<
	{
		courseId: string;
		name: string;
		videoFileId: string;
		topics: string[];
		homework: {
			test?: {
				text: string;
				answers: string[];
				correctAnswer: string;
			}[];
			text?: string;
		};
	},
	{
		lesson: Lesson;
	}
>;

export const createLesson = (req: CreateLessonDto["req"]) =>
	apiClient.post<CreateLessonDto["res"]>(
		`/api/internal/admin/courses/${req.courseId}/lessons`,
		req,
	);
