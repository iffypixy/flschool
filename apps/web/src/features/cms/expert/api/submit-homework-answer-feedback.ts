import {Dto, apiClient} from "@shared/api";

export type SubmitHomeworkAnswerFeedbackDto = Dto<
	{
		courseId: string;
		answerId: string;
		comment?: string;
		rating: number;
	},
	void
>;

export const submitHomeworkAnswerFeedback = (
	req: SubmitHomeworkAnswerFeedbackDto["req"],
) =>
	apiClient.post<SubmitHomeworkAnswerFeedbackDto["res"]>(
		`/api/internal/expert/courses/${req.courseId}/homeworks/answers/${req.answerId}/feedback`,
		req,
	);
