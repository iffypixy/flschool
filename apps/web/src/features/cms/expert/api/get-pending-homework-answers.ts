import {HomeworkAnswer} from "@entities/homework";
import {User} from "@entities/user";
import {Dto, apiClient} from "@shared/api";

export type GetPendingHomeworkAnswersDto = Dto<
	string,
	{
		pendingAnswers: Array<{
			id: HomeworkAnswer["id"];
			student: User & {
				progress: number;
			};
		}>;
	}
>;

export const getPendingHomeworkAnswers = (
	req: GetPendingHomeworkAnswersDto["req"],
) =>
	apiClient.get<GetPendingHomeworkAnswersDto["res"]>(
		`/api/internal/expert/courses/${req}/homeworks/answers/pending`,
	);
