import {Lesson} from "@entities/lesson";
import {Dto, apiClient} from "@shared/api";

export type GetLessonDto = Dto<
	{
		courseId: string;
		lessonId: string;
	},
	{
		lesson: Lesson;
	}
>;

export const getLesson = (req: GetLessonDto["req"]) =>
	apiClient.delete<GetLessonDto["res"]>(
		`/api/internal/admin/courses/${req.courseId}/lessons/${req.lessonId}`,
	);
