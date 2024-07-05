import {Homework, HomeworkAnswer} from "@entities/homework";
import {User} from "@entities/user";
import {Dto, apiClient} from "@shared/api";

export type GetHomeworkAnswerDto = Dto<
	{
		courseId: string;
		answerId: string;
	},
	{
		pendingAnswer: HomeworkAnswer & {
			homework: Homework;
			student: User & {
				progress: number;
			};
		};
	}
>;

export const getHomeworkAnswer = (req: GetHomeworkAnswerDto["req"]) =>
	apiClient.get<GetHomeworkAnswerDto["res"]>(
		`/api/internal/expert/courses/${req.courseId}/homeworks/answers/${req.answerId}`,
	);
