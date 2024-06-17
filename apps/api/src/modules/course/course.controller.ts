import {
	BadRequestException,
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	Session,
	UseGuards,
} from "@nestjs/common";
import {Course, Expert} from "@prisma/client";
import {SessionWithData} from "express-session";

import {PrismaService} from "@lib/prisma";
import {PaginationDto} from "@lib/dtos";
import {isUndefined} from "@lib/auxiliary";
import {IsAuthenticated, IsExpert} from "@modules/auth";
import {UploadService} from "@modules/upload";

import {generateCertificatePdf} from "./lib/certificate";
import {CourseService} from "./course.service";
import * as dtos from "./dtos";
import {extractObject} from "@/lib/s3";

@Controller("courses")
export class CourseController {
	constructor(
		private readonly prisma: PrismaService,
		private readonly service: CourseService,
		private readonly uploadService: UploadService,
	) {}

	@Get("fl-teens")
	async getFlTeensCourses(@Query() query: PaginationDto) {
		const {courses, total} = await this.service.loadCourses(
			"FL_TEENS",
			query,
		);

		return {
			courses,
			total,
		};
	}

	@Get("education")
	async getEducationCourses(@Query() query: PaginationDto) {
		const {courses, total} = await this.service.loadCourses(
			"EDUCATION",
			query,
		);

		return {
			courses,
			total,
		};
	}

	@Get("language")
	async getLanguageCourses(@Query() query: PaginationDto) {
		const {courses, total} = await this.service.loadCourses(
			"LANGUAGE",
			query,
		);

		return {
			courses,
			total,
		};
	}

	@Get("popular")
	async getPopularCourse(@Session() session: SessionWithData) {
		const minReviews = 0;
		const avgRating = 4;

		const [course] = (await this.prisma.$queryRaw`
			SELECT
				c.*,
				AVG(r.rating) AS rating,
				COUNT(cr.id) AS reviews,
				(
				(COUNT(cr.id) * AVG(r.rating)) + (${minReviews} * ${avgRating})
				) / (
				COUNT(cr.id) + ${minReviews}
				) AS score
			FROM
				"Course" c
			JOIN
				"CourseReview" cr ON c."id" = cr."courseId"
			JOIN
				"Review" r ON cr."reviewId" = r."id"
			LEFT JOIN
				"Student" s ON c."id" = s."courseId" AND s."userId" = ${session.userId}
			WHERE
				s."id" IS NULL
			GROUP BY
				c."id"
			ORDER BY
				score DESC
			LIMIT
				1;
		`) as Course[];

		if (!course) throw new NotFoundException("Course not found");

		return {
			course,
		};
	}

	@Get(":id")
	async getCourse(@Param("id") id: string) {
		const [course] = (await this.prisma.$queryRaw`
			SELECT
				c.*,
				COUNT(cr.id) AS reviews,
				AVG(r.rating) AS rating,
				(SUM(CASE WHEN r.rating >= 4 THEN 1 ELSE 0 END) / COUNT(cr.id)) as positiveReviews,
			FROM
				"Course" c
			LEFT JOIN
				"CourseReview" cr ON c."id" = cr."courseId"
			LEFT JOIN
				"Review" r ON cr."reviewId" = r."id"
			WHERE
				c."id" = ${id}
			GROUP BY
				c."id"
		`) as Course[];

		if (!course) throw new NotFoundException("Course not found");

		const [expert] = (await this.prisma.$queryRaw`
			SELECT
				e.*,
				AVG(r.rating) AS rating,
                COUNT(DISTINCT s.userId) AS students,
                COUNT(DISTINCT c.id) AS courses
			FROM
				"Expert" e
			JOIN
				"Course" c ON e."id" = c."authorId"
			LEFT JOIN
				"CourseReview" cr ON c."id" = cr."courseId"
			LEFT JOIN
				"Review" r ON cr."reviewId" = r."id"
            LEFT JOIN
                "Student" s ON c."id" = s."courseId"
            WHERE
                c."id" = ${course.id}
			GROUP BY
				e."id"
			ORDER BY
				rating DESC;
		`) as Expert[];

		if (!expert) throw new NotFoundException("Course expert not found");

		return {
			course: {
				...course,
				expert,
			},
		};
	}

	@Get(":id/lessons")
	async getCourseLessons(
		@Param("id") id: string,
		@Session() session: SessionWithData,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const student = await this.prisma.student.findFirst({
			where: {
				courseId: course.id,
				userId: session.userId,
			},
			select: {
				progress: true,
			},
		});

		const lessons = await this.prisma.courseLesson.findMany({
			where: {
				courseId: course.id,
			},
		});

		return {
			lessons,
			progress: student.progress,
		};
	}

	@UseGuards(IsAuthenticated)
	@Get(":courseId/lessons/:lessonId")
	async getCourseLesson(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Session() session: SessionWithData,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id: courseId,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lesson = await this.prisma.courseLesson.findFirst({
			where: {
				id: lessonId,
				courseId: course.id,
			},
		});

		if (!lesson) throw new NotFoundException("Lesson not found");

		const student = await this.prisma.student.findFirst({
			where: {
				courseId: course.id,
				userId: session.userId,
			},
		});

		const exception = new BadRequestException(
			"You don't have permissions to access this lesson",
		);

		if (!student) throw exception;

		const canAccess = student.progress + 1 >= lesson.order;

		if (!canAccess) throw exception;

		const homework = await this.prisma.lessonHomework.findFirst({
			where: {
				lessonId: lesson.id,
			},
		});

		const question = await this.prisma.homeworkQuestion.findFirst({
			where: {
				id: homework.questionId,
			},
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
		});

		const answer = await this.prisma.homeworkAnswer.findFirst({
			where: {
				homeworkId: homework.id,
				userId: session.userId,
			},
			include: {
				feedback: true,
				submittedTest: {
					include: {
						test: {
							include: {
								questions: {
									include: {
										answers: true,
										submittedAnswers: {
											where: {
												userId: session.userId,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		const video = await this.uploadService.getPresignedUrlToGet(
			extractObject(lesson.video).objectKey(),
		);

		if (question.type === "TEST") {
			return {
				lesson: {
					...lesson,
					video,
					answer,
					question: {
						...question,
						test: question.test,
					},
				},
			};
		} else if (question.type === "TEXT") {
			return {
				lesson: {
					...lesson,
					video,
					answer,
					question: {
						...question,
						text: question.text,
					},
				},
			};
		}
	}

	@Post(":courseId/lessons/:lessonId/homework/answer")
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
		});

		if (!course) throw new NotFoundException("Course not found");

		const student = await this.prisma.student.findFirst({
			where: {
				courseId: course.id,
				userId: session.userId,
			},
		});

		const canAccessCourse = !!student;

		if (!canAccessCourse)
			throw new BadRequestException("Can't access this course");

		const lesson = await this.prisma.courseLesson.findFirst({
			where: {
				id: lessonId,
				courseId,
			},
		});

		if (!lesson) throw new NotFoundException("Lesson not found");

		const canAccessLesson = student.progress + 1 >= lesson.order;

		if (!canAccessLesson)
			throw new BadRequestException("Can't access this lesson");

		const homework = await this.prisma.lessonHomework.findFirst({
			where: {
				lessonId: lesson.id,
			},
			include: {
				question: true,
			},
		});

		if (!homework) throw new BadRequestException("No homework provided");

		const answers = await this.prisma.homeworkAnswer.count({
			where: {
				homeworkId: homework.id,
				userId: session.userId,
			},
		});

		const alreadyAnswered = answers > 0;

		if (alreadyAnswered)
			throw new BadRequestException(
				"You have already provided the answer",
			);

		if (homework.question.type === "TEXT") {
			const answerExists = dto.text || dto.file;

			if (!answerExists)
				throw new BadRequestException(
					"Provide a text and/or file as an answer",
				);

			const answer = await this.prisma.homeworkAnswer.create({
				data: {
					homeworkId: homework.id,
					userId: session.userId,
					text: dto.text,
					file: dto.file,
					status: "PENDING",
				},
			});

			return {
				answer,
			};
		} else if (homework.question.type === "TEST") {
			const totalQ = await this.prisma.testQuestion.count({
				where: {
					testId: homework.question.testId,
				},
			});

			const providedQ = await this.prisma.testQuestion.count({
				where: {
					id: {
						in: Object.keys(dto.answers),
					},
					testId: homework.question.testId,
				},
			});

			const questionsValid = totalQ === providedQ;

			if (!questionsValid)
				throw new BadRequestException("Invalid questions");

			const entries = Object.entries(dto.answers);

			for (let i = 0; i < entries.length; i++) {
				const [questionId, answerId] = entries[i];

				const answers = await this.prisma.testAnswer.count({
					where: {
						testId: homework.question.testId,
						id: answerId,
					},
				});

				const answerExists = answers > 0;

				if (!answerExists)
					throw new BadRequestException("Invalid answer id");

				await this.prisma.userTestAnswer.create({
					data: {
						questionId,
						answerId,
						userId: session.userId,
						testId: homework.question.testId,
					},
				});
			}

			const submittedTest = await this.prisma.userTest.create({
				data: {
					testId: homework.question.testId,
					userId: session.userId,
				},
			});

			const answer = await this.prisma.homeworkAnswer.create({
				data: {
					homeworkId: homework.id,
					userId: session.userId,
					submittedTestId: submittedTest.id,
					status: "PENDING",
				},
			});

			return {
				answer,
			};
		}
	}

	@Put(":courseId/lessons/:lessonId/homework/answer")
	async updateHomeworkAnswer(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Session() session: SessionWithData,
		@Body() dto: dtos.UpdateHomeworkAnswerDto,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id: courseId,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const student = await this.prisma.student.findFirst({
			where: {
				courseId: course.id,
				userId: session.userId,
			},
		});

		const canAccessCourse = !!student;

		if (!canAccessCourse)
			throw new BadRequestException("Can't access this course");

		const lesson = await this.prisma.courseLesson.findFirst({
			where: {
				id: lessonId,
				courseId,
			},
		});

		if (!lesson) throw new NotFoundException("Lesson not found");

		const canAccessLesson = student.progress + 1 >= lesson.order;

		if (!canAccessLesson)
			throw new BadRequestException("Can't access this lesson");

		const homework = await this.prisma.lessonHomework.findFirst({
			where: {
				lessonId: lesson.id,
			},
			include: {
				question: true,
			},
		});

		if (!homework) throw new BadRequestException("No homework provided");

		const answer = await this.prisma.homeworkAnswer.findFirst({
			where: {
				userId: session.userId,
				homeworkId: homework.id,
			},
		});

		if (!answer)
			throw new BadRequestException("No answer has been provided yet");

		if (homework.question.type === "TEST") {
			const entries = Object.entries(dto.answers);

			for (let i = 0; i < entries.length; i++) {
				const [questionId, answerId] = entries[i];

				const answers = await this.prisma.testAnswer.count({
					where: {
						testId: homework.question.testId,
						questionId,
					},
				});

				const answerExists = answers > 0;

				if (!answerExists)
					throw new BadRequestException("Invalid answer id");

				await this.prisma.userTestAnswer.update({
					where: {
						userId_testId_questionId: {
							testId: homework.question.testId,
							questionId,
							userId: session.userId,
						},
					},
					data: {
						answerId,
					},
				});
			}

			return {
				answer,
			};
		} else if (homework.question.type === "TEXT") {
			const updated = await this.prisma.homeworkAnswer.update({
				where: {
					id: answer.id,
				},
				data: {
					text: isUndefined(dto.text) ? answer.text : dto.text,
					file: isUndefined(dto.file) ? answer.file : dto.file,
				},
			});

			return {
				answer: updated,
			};
		}
	}

	@Post(":id/reviews")
	async reviewCourse(
		@Param("id") id: string,
		@Body() dto: dtos.ReviewCourseDto,
		@Session() session: SessionWithData,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const review = await this.prisma.review.create({
			data: {
				rating: dto.rating,
			},
		});

		const creview = await this.prisma.courseReview.create({
			data: {
				courseId: course.id,
				userId: session.userId,
				feedback: dto.feedback,
				reviewId: review.id,
			},
		});

		return {
			review: creview,
		};
	}

	@Post(":courseId/lessons/:lessonId/reviews")
	async reviewCourseLesson(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Body() dto: dtos.ReviewCourseDto,
		@Session() session: SessionWithData,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id: courseId,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lesson = await this.prisma.courseLesson.findFirst({
			where: {
				id: lessonId,
			},
		});

		if (!lesson) throw new NotFoundException("Lesson not found");

		const review = await this.prisma.review.create({
			data: {
				rating: dto.rating,
			},
		});

		const lreview = await this.prisma.courseLessonReview.create({
			data: {
				lessonId: lesson.id,
				userId: session.userId,
				reviewId: review.id,
			},
		});

		return {
			review: lreview,
		};
	}

	@UseGuards(IsExpert)
	@Post("answers/:answerId/feedback")
	async leaveAnswerFeedback(
		@Param("answerId") answerId: string,
		@Body() dto: dtos.LeaveAnswerFeedbackDto,
	) {
		const answer = await this.prisma.homeworkAnswer.findFirst({
			where: {
				id: answerId,
			},
		});

		if (!answer) throw new NotFoundException("Answer not found");

		const review = await this.prisma.review.create({
			data: {
				rating: dto.rating,
			},
		});

		const feedback = await this.prisma.homeworkAnswerFeedback.create({
			data: {
				answerId: answer.id,
				reviewId: review.id,
				comment: dto.comment,
			},
		});

		return {
			feedback,
		};
	}

	@Get(":id/certificate")
	async getCourseCertificate(
		@Param("id") id: string,
		@Session() session: SessionWithData,
	) {
		const students = await this.prisma.student.count({
			where: {
				userId: session.userId,
				courseId: id,
			},
		});

		const studentExists = students > 0;

		if (!studentExists)
			throw new BadRequestException("You can't access this course");

		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const pdf = await generateCertificatePdf(
			`${session.user.firstName} ${session.user.lastName}`,
			course.name,
		);

		return {
			certificate: pdf,
		};
	}
}
