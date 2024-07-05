import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Session,
	UseGuards,
} from "@nestjs/common";
import {SessionWithData} from "express-session";

import {IsExpert} from "@modules/auth";
import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

import * as dtos from "./dtos";

@UseGuards(IsExpert)
@Controller("internal/expert")
export class ExpertController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("courses")
	async getMyCourses(@Session() session: SessionWithData) {
		const courses = await this.prisma.course.findMany({
			where: {
				author: {
					userId: session.userId,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			include: {
				previewFile: true,
			},
		});

		const list = [];

		for (let i = 0; i < courses.length; i++) {
			const course = courses[i];

			const students = await this.prisma.studentProgress.count({
				where: {
					courseId: course.id,
				},
			});

			const pendingHwAnswers = await this.prisma.homeworkAnswer.groupBy({
				by: "homeworkId",
				where: {
					status: "PENDING",
					homework: {
						type: "TEXT",
						lesson: {
							courseId: course.id,
						},
					},
				},
				_max: {
					createdAt: true,
				},
			});

			list.push({
				...sanitized.course(course),
				students,
				pendingHwAnswers: pendingHwAnswers.length,
			});
		}

		return {
			courses: list,
		};
	}

	@Get("courses/:id/homeworks/answers/pending")
	async getCoursePendingAnswers(
		@Session() session: SessionWithData,
		@Param("id") id: string,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id,
				author: {
					userId: session.userId,
				},
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const pendingHwAnswers = await this.prisma.homeworkAnswer.findMany({
			where: {
				status: "PENDING",
				homework: {
					type: "TEXT",
					lesson: {
						courseId: course.id,
					},
				},
			},
			include: {
				user: {
					include: {
						avatarFile: true,
					},
				},
			},
		});

		const list = [];

		for (let i = 0; i < pendingHwAnswers.length; i++) {
			const answer = pendingHwAnswers[i];

			const {progress} = (await this.prisma.studentProgress.findFirst({
				where: {
					userId: answer.userId,
					courseId: course.id,
				},
				select: {
					progress: true,
				},
			})) || {progress: 0};

			list.push({
				id: answer.id,
				student: {
					...sanitized.user(answer.user),
					progress,
				},
			});
		}

		return {
			pendingAnswers: list,
		};
	}

	@Get("courses/:courseId/homeworks/answers/:answerId")
	async getPendingAnswer(
		@Param("courseId") courseId: string,
		@Param("answerId") answerId: string,
		@Session() session: SessionWithData,
	) {
		const answer = await this.prisma.homeworkAnswer.findFirst({
			where: {
				id: answerId,
				status: "PENDING",
				homework: {
					type: "TEXT",
					lesson: {
						course: {
							id: courseId,
							author: {
								userId: session.userId,
							},
						},
					},
				},
			},
			include: {
				user: {
					include: {
						avatarFile: true,
					},
				},
				file: true,
				homework: {
					include: {
						test: {
							include: {
								questions: {
									include: {
										answers: true,
									},
								},
							},
						},
					},
				},
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

		if (!answer) throw new NotFoundException("Answer not found");

		const {progress} = (await this.prisma.studentProgress.findFirst({
			where: {
				courseId,
				userId: answer.userId,
			},
			select: {
				progress: true,
			},
		})) || {progress: 0};

		return {
			pendingAnswer: {
				...sanitized.homeworkAnswer(answer),
				homework: sanitized.homework(answer.homework),
				student: {
					...sanitized.user(answer.user),
					progress,
				},
			},
		};
	}

	@Post("courses/:courseId/homeworks/answers/:answerId/feedback")
	async submitAnswerFeedback(
		@Param("courseId") courseId: string,
		@Param("answerId") answerId: string,
		@Session() session: SessionWithData,
		@Body() dto: dtos.SubmitAnswerFeedbackDto,
	) {
		const expert = await this.prisma.expert.findFirst({
			where: {
				userId: session.userId,
			},
			include: {
				user: {
					include: {
						avatarFile: true,
					},
				},
			},
		});

		const answer = await this.prisma.homeworkAnswer.findFirst({
			where: {
				id: answerId,
				homework: {
					type: "TEXT",
					lesson: {
						course: {
							id: courseId,
							author: {
								userId: session.userId,
							},
						},
					},
				},
			},
			include: {
				homework: {
					include: {
						lesson: {
							select: {
								order: true,
							},
						},
					},
				},
			},
		});

		if (!answer) throw new NotFoundException("Answer not found");

		const rating = +dto.rating;

		const review = await this.prisma.review.create({
			data: {
				rating,
			},
		});

		const feedback = await this.prisma.homeworkAnswerFeedback.findFirst({
			where: {
				answerId: answer.id,
			},
		});

		if (feedback) {
			await this.prisma.homeworkAnswerFeedback.update({
				where: {
					id: feedback.id,
				},
				data: {
					reviewId: review.id,
					comment: dto.comment,
				},
			});
		} else {
			await this.prisma.homeworkAnswerFeedback.create({
				data: {
					expertId: expert.id,
					answerId: answer.id,
					reviewId: review.id,
					comment: dto.comment,
				},
			});
		}

		const hasApproved = rating >= 3;

		await this.prisma.homeworkAnswer.update({
			where: {
				id: answer.id,
			},
			data: {
				status: hasApproved ? "APPROVED" : "FAILED",
			},
		});

		if (hasApproved) {
			const student = await this.prisma.studentProgress.findFirst({
				where: {
					userId: answer.userId,
					courseId,
				},
				select: {
					id: true,
					progress: true,
				},
			});

			if (!student) {
				await this.prisma.studentProgress.create({
					data: {
						progress: 1,
						courseId,
						userId: answer.userId,
					},
				});
			} else {
				await this.prisma.studentProgress.updateMany({
					where: {
						courseId,
						userId: answer.userId,
					},
					data: {
						progress: Math.max(
							student.progress,
							answer.homework.lesson.order + 1,
						),
					},
				});
			}
		}
	}
}
