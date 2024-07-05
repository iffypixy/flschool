import {Lesson} from "@entities/lesson";
import {Dto, apiClient} from "@shared/api";

export type EditLessonDto = Dto<
	{
		lessonId: string;
		courseId: string;
		name?: string;
		videoFileId?: string;
		topics?: string[];
		homework?: {
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

export const editLesson = (req: EditLessonDto["req"]) =>
	apiClient.put<EditLessonDto["res"]>(
		`/api/internal/admin/courses/${req.courseId}/lessons/${req.lessonId}`,
		req,
	);
