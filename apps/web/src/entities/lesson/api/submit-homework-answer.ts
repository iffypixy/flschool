import {HomeworkAnswer} from "@entities/homework";
import {Dto, apiClient} from "@shared/api";

export type SubmitHomeworkAnswerDto = Dto<
	{
		courseId: string;
		lessonId: string;
		text?: string;
		fileId?: string;
		test?: Record<string, string>;
	},
	{
		answer: HomeworkAnswer;
	}
>;

export const submitHomeworkAnswer = (req: SubmitHomeworkAnswerDto["req"]) =>
	apiClient.post<SubmitHomeworkAnswerDto["res"]>(
		`/api/courses/${req.courseId}/lessons/${req.lessonId}/homework/answers`,
		req,
	);
