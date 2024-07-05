import {HomeworkAnswerStatus} from "../types";

export const homeworkStatusToLabel = (key: HomeworkAnswerStatus) => {
	const values: Record<HomeworkAnswerStatus, string> = {
		APPROVED: "Одобрено",
		FAILED: "На доработку",
		PENDING: "На проверке",
	};

	return values[key];
};
