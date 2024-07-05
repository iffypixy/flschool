import {Dto, apiClient} from "@shared/api";

export type DeleteLessonDto = Dto<
	{
		courseId: string;
		lessonId: string;
	},
	void
>;

export const deleteLesson = (req: DeleteLessonDto["req"]) =>
	apiClient.delete<DeleteLessonDto["res"]>(
		`/api/internal/admin/courses/${req.courseId}/lessons/${req.lessonId}`,
	);
