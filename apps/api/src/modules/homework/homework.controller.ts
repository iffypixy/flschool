import {
	BadRequestException,
	Body,
	Controller,
	NotFoundException,
	Param,
	Post,
	Put,
	Session,
} from "@nestjs/common";
import {SessionWithData} from "express-session";
import {Prisma} from "@prisma/client";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

import * as dtos from "./dtos";

@Controller("courses")
export class HomeworkController {
	constructor(private readonly prisma: PrismaService) {}

	@Post(":courseId/lessons/:lessonId/homework/answers")
	async submitHomeworkAnswer(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Session() session: SessionWithData,
		@Body() dto: dtos.SubmitHomeworkAnswerDto,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id: courseId,
			},
			include: {
				lessons: true,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lesson = await this.prisma.lesson.findFirst({
			where: {
				id: lessonId,
				courseId: course.id,
			},
			include: {
				videoFile: true,
			},
		});

		if (!lesson) throw new NotFoundException("Lesson not found");

		const isEnrolled = !!(await this.prisma.courseEnrollment.findFirst({
			where: {
				userId: session.userId,
				OR: [
					{
						courseId: course.id,
					},
					{
						pack: course.type,
					},
				],
			},
		}));

		const exception = new BadRequestException(
			"You can't access this lesson",
		);

		if (!isEnrolled) throw exception;

		const {progress} = (await this.prisma.studentProgress.findFirst({
			where: {
				userId: session.userId,
				courseId: course.id,
			},
			select: {
				progress: true,
			},
		})) || {progress: 0};

		const canAccess = progress >= lesson.order;

		if (!canAccess) throw exception;

		const homework = await this.prisma.lessonHomework.findFirst({
			where: {
				lessonId: lesson.id,
			},
		});

		if (!homework) throw new BadRequestException("No homework provided");

		if (homework.type === "TEXT") {
			const answerProvided = dto.text || dto.fileId;

			if (!answerProvided)
				throw new BadRequestException(
					"Provide a text and/or file as an answer",
				);

			const existing = await this.prisma.homeworkAnswer.findFirst({
				where: {
					userId: session.userId,
					homework: {
						lesson: {
							id: lesson.id,
							courseId: course.id,
						},
					},
				},
				select: {
					id: true,
				},
			});

			let answer: Prisma.HomeworkAnswerGetPayload<{
				include: {
					file: true;
				};
			}>;

			if (existing) {
				answer = await this.prisma.homeworkAnswer.update({
					where: {
						id: existing.id,
					},
					data: {
						text: dto.text,
						status: "PENDING",
						fileId: dto.fileId,
						submittedTestId: null,
					},
					include: {
						file: true,
					},
				});
			} else {
				answer = await this.prisma.homeworkAnswer.create({
					data: {
						homeworkId: homework.id,
						userId: session.userId,
						fileId: dto.fileId,
						text: dto.text,
						status: "PENDING",
					},
					include: {
						file: true,
					},
				});
			}

			return {
				answer: sanitized.homeworkAnswer({
					...answer,
					submittedTest: null,
				}),
			};
		} else if (homework.type === "TEST") {
			const totalQsCount = await this.prisma.testQuestion.count({
				where: {
					testId: homework.testId,
				},
			});

			const providedQsCount = await this.prisma.testQuestion.count({
				where: {
					id: {
						in: Object.keys(dto.test),
					},
					testId: homework.testId,
				},
			});

			const questionsValid = totalQsCount === providedQsCount;

			if (!questionsValid)
				throw new BadRequestException("Invalid answer");

			const pairs = Object.entries(dto.test);

			let correctAnswers = 0;
			let totalAnswers = 0;

			for (let i = 0; i < pairs.length; i++) {
				const [questionId, answerId] = pairs[i];

				const question = await this.prisma.testQuestion.findFirst({
					where: {
						testId: homework.testId,
						id: questionId,
					},
				});

				const answer = await this.prisma.testAnswer.findFirst({
					where: {
						testId: homework.testId,
						id: answerId,
						questionId: questionId,
					},
				});

				if (!question || !answer)
					throw new BadRequestException("Invalid answer/question id");

				if (answer.isCorrect) correctAnswers++;

				totalAnswers++;
			}

			const submittedTest = await this.prisma.submittedTest.create({
				data: {
					testId: homework.testId,
					userId: session.userId,
				},
			});

			for (let i = 0; i < pairs.length; i++) {
				const [questionId, answerId] = pairs[i];

				await this.prisma.submittedTestAnswer.create({
					data: {
						questionId,
						answerId,
						userId: session.userId,
						testId: homework.testId,
						submittedTestId: submittedTest.id,
					},
				});
			}

			const result = correctAnswers / totalAnswers;
			const resultApproved = result >= 0.5;

			const existing = await this.prisma.homeworkAnswer.findFirst({
				where: {
					userId: session.userId,
					homework: {
						lesson: {
							id: lesson.id,
							courseId: course.id,
						},
					},
				},
				select: {
					id: true,
				},
			});

			let answer: Prisma.HomeworkAnswerGetPayload<{
				include: {
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
			}>;

			if (existing) {
				answer = await this.prisma.homeworkAnswer.update({
					where: {
						id: existing.id,
					},
					data: {
						text: null,
						fileId: null,
						submittedTestId: submittedTest.id,
						status: resultApproved ? "APPROVED" : "FAILED",
					},
					include: {
						submittedTest: {
							include: {
								submittedAnswers: {
									include: {
										answer: true,
										question: {
											include: {
												answers: true,
											},
										},
									},
								},
							},
						},
					},
				});
			} else {
				answer = await this.prisma.homeworkAnswer.create({
					data: {
						homeworkId: homework.id,
						userId: session.userId,
						submittedTestId: submittedTest.id,
						status: resultApproved ? "APPROVED" : "FAILED",
					},
					include: {
						submittedTest: {
							include: {
								submittedAnswers: {
									include: {
										answer: true,
										question: {
											include: {
												answers: true,
											},
										},
									},
								},
							},
						},
					},
				});
			}

			if (resultApproved) {
				if (progress === 0) {
					await this.prisma.studentProgress.create({
						data: {
							progress: 1,
							courseId: course.id,
							userId: session.userId,
						},
					});
				} else {
					await this.prisma.studentProgress.updateMany({
						where: {
							courseId: course.id,
							userId: session.userId,
						},
						data: {
							progress: Math.max(progress, lesson.order + 1),
						},
					});
				}
			}

			return {
				answer: sanitized.homeworkAnswer({
					...answer,
					file: null,
				}),
			};
		}
	}

	@Put(":courseId/lessons/:lessonId/homework/answers/:answerId")
	async editHomeworkAnswer(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Param("answerId") answerId: string,
		@Session() session: SessionWithData,
		@Body() dto: dtos.EditHomeworkAnswerDto,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id: courseId,
			},
			include: {
				lessons: true,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lesson = await this.prisma.lesson.findFirst({
			where: {
				id: lessonId,
				courseId: course.id,
			},
			include: {
				videoFile: true,
			},
		});

		if (!lesson) throw new NotFoundException("Lesson not found");

		const isEnrolled = !!(await this.prisma.courseEnrollment.findFirst({
			where: {
				userId: session.userId,
				OR: [
					{
						courseId: course.id,
					},
					{
						pack: course.type,
					},
				],
			},
		}));

		const exception = new BadRequestException(
			"You can't access this lesson",
		);

		if (!isEnrolled) throw exception;

		const {progress} = (await this.prisma.studentProgress.findFirst({
			where: {
				userId: session.userId,
				courseId: course.id,
			},
			select: {
				progress: true,
			},
		})) || {progress: 0};

		const canAccess = progress >= lesson.order;

		if (!canAccess) throw exception;

		const answer = await this.prisma.homeworkAnswer.findFirst({
			where: {
				id: answerId,
				userId: session.userId,
				homework: {
					lesson: {
						id: lesson.id,
						courseId: course.id,
					},
				},
			},
			include: {
				homework: true,
			},
		});

		if (!answer) throw new BadRequestException("Homework answer not found");

		if (answer.homework.type === "TEST") {
			const pairs = Object.entries(dto.test);

			for (let i = 0; i < pairs.length; i++) {
				const [questionId, answerId] = pairs[i];

				const testQuestion = await this.prisma.testQuestion.findFirst({
					where: {
						id: questionId,
						testId: answer.homework.testId,
					},
				});

				const testAnswer = await this.prisma.testAnswer.findFirst({
					where: {
						id: answerId,
						testId: answer.homework.testId,
						questionId,
					},
				});

				if (!testQuestion || !testAnswer)
					throw new BadRequestException("Invalid answer");

				await this.prisma.submittedTestAnswer.updateMany({
					where: {
						testId: answer.homework.testId,
						questionId: testQuestion.id,
						userId: session.userId,
					},
					data: {
						answerId,
					},
				});
			}
		} else if (answer.homework.type === "TEXT") {
			await this.prisma.homeworkAnswer.update({
				where: {
					id: answer.id,
				},
				data: {
					text: dto.text,
					fileId: dto.fileId,
					status: "PENDING",
				},
			});
		}

		const updated = await this.prisma.homeworkAnswer.findFirst({
			where: {
				homeworkId: answer.homework.id,
				userId: session.userId,
			},
			orderBy: {
				createdAt: "desc",
			},
			include: {
				feedback: {
					include: {
						expert: {
							include: {
								user: {
									include: {
										avatarFile: true,
									},
								},
							},
						},
						review: true,
					},
				},
				file: true,
				submittedTest: {
					include: {
						submittedAnswers: {
							include: {
								answer: true,
								question: {
									include: {
										answers: true,
									},
								},
							},
						},
					},
				},
			},
		});

		return {
			answer: {
				...sanitized.homeworkAnswer(updated),
				feedback:
					updated.feedback &&
					sanitized.homeworkAnswerFeedback(updated.feedback),
			},
		};
	}
}
