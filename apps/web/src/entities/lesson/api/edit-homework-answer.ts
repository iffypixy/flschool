import {UploadedFile} from "@entities/file";
import {HomeworkAnswer} from "@entities/homework";
import {Dto, apiClient} from "@shared/api";

export type EditHomeworkAnswerDto = Dto<
	{
		courseId: string;
		lessonId: string;
		text?: string;
		file?: UploadedFile;
		test?: Record<string, string>;
	},
	{
		answer: HomeworkAnswer;
	}
>;

export const editHomeworkAnswer = (req: EditHomeworkAnswerDto["req"]) =>
	apiClient.put<EditHomeworkAnswerDto["res"]>(
		`/api/courses/${req.courseId}/lessons/${req.lessonId}/homework/answers`,
	);
