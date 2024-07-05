import {Prisma} from "@prisma/client";

import {sanitized} from "@lib/sanitized";

export const homework = (
	hw: Prisma.LessonHomeworkGetPayload<{
		include: {
			test: {
				include: {
					questions: {
						include: {
							answers: true;
						};
					};
				};
			};
		};
	}>,
) => ({
	id: hw.id,
	text: hw.text,
	test: hw.test && {
		id: hw.test.id,
		questions: hw.test.questions.map((q) => ({
			id: q.id,
			text: q.text,
			answers: q.answers.map((a) => ({
				id: a.id,
				text: a.text,
			})),
		})),
	},
	type: hw.type,
});

export const homeworkAnswer = (
	answer: Prisma.HomeworkAnswerGetPayload<{
		include: {
			file: true;
			submittedTest: {
				include: {
					submittedAnswers: {
						include: {
							answer: true;
							question: {
								include: {
									answers: true;
								};
							};
						};
					};
				};
			};
		};
	}>,
) => ({
	id: answer.id,
	file: answer.file && sanitized.file(answer.file),
	text: answer.text,
	status: answer.status,
	submittedTest: answer.submittedTest && {
		id: answer.submittedTest.id,
		questions: answer.submittedTest.submittedAnswers.map((sa) => ({
			id: sa.question.id,
			text: sa.question.text,
			isCorrect: sa.answer.isCorrect,
			answers: sa.question.answers.map((a) => ({
				id: a.id,
				text: a.text,
				isSelected: a.id === sa.answer.id,
			})),
		})),
	},
});

export const homeworkAnswerFeedback = (
	feedback: Prisma.HomeworkAnswerFeedbackGetPayload<{
		include: {
			expert: {
				include: {
					user: {
						include: {
							avatarFile: true;
						};
					};
				};
			};
			review: true;
		};
	}>,
) => ({
	id: feedback.id,
	review: feedback.review.rating,
	comment: feedback.comment,
	expert: sanitized.expert(feedback.expert),
});
