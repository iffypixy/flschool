import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from "@nestjs/common";
import {Course, Lesson, LessonHomeworkType} from "@prisma/client";

import {sanitized} from "@lib/sanitized";
import {PrismaService} from "@lib/prisma";
import {shuffle} from "@lib/auxiliary";
import {IsAdmin} from "@modules/auth";

import * as dtos from "../dtos";

@UseGuards(IsAdmin)
@Controller("internal/admin/courses")
export class AdminCourseController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllCourses() {
		const courses = await this.prisma.course.findMany({
			include: {
				previewFile: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const list = [];

		for (let i = 0; i < courses.length; i++) {
			const course = courses[i];

			const lessons = await this.prisma.lesson.count({
				where: {
					courseId: course.id,
				},
			});

			list.push({
				...sanitized.course(course),
				lessons,
			});
		}

		return {
			courses: list,
		};
	}

	@Post("/")
	async createCourse(@Body() dto: dtos.CreateCourseDto) {
		const course = await this.prisma.course.create({
			data: {
				name: dto.name,
				hook: dto.hook,
				description: dto.description,
				duration: dto.duration,
				language: dto.language,
				previewFileId: dto.previewFileId,
				audience: dto.audience,
				type: dto.type,
				price: dto.price,
				authorId: dto.authorId,
			},
			include: {
				author: {
					include: {
						user: {
							include: {
								avatarFile: true,
							},
						},
					},
				},
				previewFile: true,
			},
		});

		return {
			course: sanitized.course(course),
		};
	}

	@Put(":id")
	async editCourse(@Param("id") id: string, @Body() dto: dtos.EditCourseDto) {
		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const updated = await this.prisma.course.update({
			where: {
				id: course.id,
			},
			data: {
				name: dto.name,
				hook: dto.hook,
				description: dto.description,
				language: dto.language,
				audience: dto.audience,
				duration: dto.duration ? +dto.duration : undefined,
				previewFileId: dto.previewFileId,
				price: dto.price ? +dto.price : undefined,
				type: dto.type,
				authorId: dto.authorId,
			},
			include: {
				author: {
					include: {
						user: {
							include: {
								avatarFile: true,
							},
						},
					},
				},
				previewFile: true,
			},
		});

		return {
			course: sanitized.course(updated),
		};
	}

	@Delete(":id")
	async deleteCourse(@Param("id") id: string) {
		await this.prisma.course.delete({
			where: {
				id,
			},
		});
	}

	@Get("language")
	async getLanguageCourseNames() {
		const courses = await this.prisma.course.findMany({
			where: {
				type: "LANGUAGE",
			},
			select: {
				id: true,
				name: true,
			},
		});

		return {
			courses,
		};
	}

	@Get("search")
	async searchCourses(@Query("query") query: string) {
		if (!query)
			return {
				courses: [],
			};

		const courses = await this.prisma.course.findMany({
			where: {
				name: {
					mode: "insensitive",
					startsWith: query,
				},
			},
			include: {
				previewFile: true,
			},
		});

		return {
			courses: courses.map(sanitized.course),
		};
	}

	@Get(":id")
	async getCourse(@Param("id") id: string) {
		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
			include: {
				author: {
					include: {
						user: {
							include: {
								avatarFile: true,
							},
						},
					},
				},
				previewFile: true,
				lessons: {
					orderBy: {
						order: "asc",
					},
					include: {
						videoFile: true,
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
					},
				},
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lessons = [];

		for (let i = 0; i < course.lessons.length; i++) {
			const lesson = course.lessons[i];

			lessons.push({
				...sanitized.lesson(lesson),
				video: lesson.videoFile,
				homework: {
					...sanitized.homework(lesson.homework),
					test: lesson.homework.test && {
						id: lesson.homework.test.id,
						questions: lesson.homework.test.questions.map((q) => ({
							id: q.id,
							text: q.text,
							answers: q.answers.map((a) => ({
								id: a.id,
								text: a.text,
								isCorrect: a.isCorrect,
							})),
						})),
					},
				},
			});
		}

		return {
			course: {
				...sanitized.course(course),
				preview: sanitized.file(course.previewFile),
				author: sanitized.expert(course.author),
				lessons,
			},
		};
	}

	@Get("lessons/reviews/metrics")
	async getLessonReviewMetrics() {
		const lessons = (await this.prisma.$queryRaw`
			SELECT
				l.*,
				AVG(r.rating)::integer AS rating,
				COUNT(lr."reviewId")::integer AS reviews
			FROM
				"Lesson" l
			LEFT JOIN
				"LessonReview" lr ON l."id" = lr."lessonId"
			LEFT JOIN
				"Review" r ON lr."reviewId" = r."id"
			GROUP BY
				l."id"
	  `) as Array<
			Lesson & {
				reviews: number;
				rating: number;
			}
		>;

		const list = [];

		for (let i = 0; i < lessons.length; i++) {
			const lesson = lessons[i];

			const course = await this.prisma.course.findFirst({
				where: {
					id: lesson.courseId,
				},
			});

			list.push({
				id: lesson.id,
				name: lesson.name,
				course: {
					id: course.id,
					name: course.name,
				},
				rating: lesson.rating || 0,
				reviews: lesson.reviews || 0,
			});
		}

		return {
			metrics: list,
		};
	}

	@Get("reviews/metrics")
	async getCourseReviewMetrics() {
		const courses = (await this.prisma.$queryRaw`
			SELECT
				c.*,
				AVG(r.rating)::integer AS rating,
				COUNT(cr."reviewId")::integer AS reviews
			FROM
				"Course" c
			LEFT JOIN
				"CourseReview" cr ON c."id" = cr."courseId"
			LEFT JOIN
				"Review" r ON cr."reviewId" = r."id"
			GROUP BY
				c."id"
	  `) as Array<
			Course & {
				reviews: number;
				rating: number;
			}
		>;

		return {
			metrics: courses.map((c) => ({
				id: c.id,
				name: c.name,
				reviews: c.reviews || 0,
				rating: c.rating || 0,
			})),
		};
	}

	@Post(":id/lessons")
	async createLesson(
		@Param("id") id: string,
		@Body() dto: dtos.CreateLessonDto,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const hwtype = dto.homework.text
			? LessonHomeworkType.TEXT
			: dto.homework.test
				? LessonHomeworkType.TEST
				: null;

		if (!hwtype) throw new BadRequestException("No homework provided");

		const lessons = await this.prisma.lesson.count({
			where: {
				courseId: course.id,
			},
		});

		const lesson = await this.prisma.lesson.create({
			data: {
				courseId: course.id,
				name: dto.name,
				videoFileId: dto.videoFileId,
				topics: dto.topics,
				order: lessons,
			},
		});

		if (hwtype === "TEST") {
			const test = await this.prisma.test.create({
				data: {},
			});

			for (let i = 0; i < dto.homework.test.length; i++) {
				const q = dto.homework.test[i];

				const question = await this.prisma.testQuestion.create({
					data: {
						testId: test.id,
						text: q.text,
						order: i,
					},
				});

				const answers = [
					...q.answers.map((a) => ({
						text: a,
						isCorrect: false,
					})),
					{
						text: q.correctAnswer,
						isCorrect: true,
					},
				];

				shuffle(answers);

				for (let j = 0; j < answers.length; j++) {
					const a = answers[j];

					await this.prisma.testAnswer.create({
						data: {
							text: a.text,
							questionId: question.id,
							testId: test.id,
							isCorrect: a.isCorrect,
						},
					});
				}
			}

			await this.prisma.lessonHomework.create({
				data: {
					lessonId: lesson.id,
					type: "TEST",
					testId: test.id,
				},
			});
		} else {
			await this.prisma.lessonHomework.create({
				data: {
					lessonId: lesson.id,
					type: "TEXT",
					text: dto.homework.text,
				},
			});
		}

		const created = await this.prisma.lesson.findFirst({
			where: {
				id: lesson.id,
			},
			include: {
				videoFile: true,
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
			},
		});

		return {
			lesson: {
				...sanitized.lesson(created),
				video: created.videoFile.url,
				homework: created.homework && {
					...sanitized.homework(created.homework),
					test: created.homework.test && {
						id: created.homework.test.id,
						questions: created.homework.test.questions.map((q) => ({
							id: q.id,
							text: q.text,
							answers: q.answers.map((a) => ({
								id: a.id,
								text: a.text,
								isCorrect: a.isCorrect,
							})),
						})),
					},
				},
			},
		};
	}

	@Put(":courseId/lessons/:lessonId")
	async editLesson(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Body() dto: dtos.CreateLessonDto,
	) {
		const lesson = await this.prisma.lesson.findFirst({
			where: {
				id: lessonId,
				courseId,
			},
			include: {
				homework: true,
			},
		});

		if (!lesson) throw new NotFoundException("Course not found");

		await this.prisma.lesson.update({
			where: {
				id: lesson.id,
			},
			data: {
				name: dto.name,
				topics: dto.topics,
				videoFileId: dto.videoFileId,
			},
		});

		const homeworkProvided = !!dto.homework;

		if (homeworkProvided) {
			const hwtype = dto.homework.text
				? LessonHomeworkType.TEXT
				: dto.homework.test
					? LessonHomeworkType.TEST
					: null;

			if (hwtype) {
				if (hwtype === "TEST") {
					const test = await this.prisma.test.create({
						data: {},
					});

					for (let i = 0; i < dto.homework.test.length; i++) {
						const q = dto.homework.test[i];

						const question = await this.prisma.testQuestion.create({
							data: {
								testId: test.id,
								text: q.text,
								order: i,
							},
						});

						const answers = [
							...q.answers.map((a) => ({
								text: a,
								isCorrect: false,
							})),
							{
								text: q.correctAnswer,
								isCorrect: true,
							},
						];

						shuffle(answers);

						for (let j = 0; j < answers.length; j++) {
							const a = answers[j];

							await this.prisma.testAnswer.create({
								data: {
									text: a.text,
									questionId: question.id,
									testId: test.id,
									isCorrect: a.isCorrect,
								},
							});
						}
					}

					await this.prisma.lessonHomework.update({
						where: {
							id: lesson.homework.id,
						},
						data: {
							type: "TEST",
							testId: test.id,
							text: null,
						},
					});
				} else {
					await this.prisma.lessonHomework.update({
						where: {
							id: lesson.homework.id,
						},
						data: {
							type: "TEXT",
							text: dto.homework.text,
							testId: null,
						},
					});
				}
			}
		}

		const updated = await this.prisma.lesson.findFirst({
			where: {
				id: lesson.id,
			},
			include: {
				videoFile: true,
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
			},
		});

		return {
			lesson: {
				...sanitized.lesson(updated),
				video: updated.videoFile.url,
				homework: updated.homework && {
					...sanitized.homework(updated.homework),
					test: updated.homework.test && {
						id: updated.homework.test.id,
						questions: updated.homework.test.questions.map((q) => ({
							id: q.id,
							text: q.text,
							answers: q.answers.map((a) => ({
								id: a.id,
								text: a.text,
								isCorrect: a.isCorrect,
							})),
						})),
					},
				},
			},
		};
	}

	@Delete(":courseId/lessons/:lessonId")
	async deleteLesson(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
	) {
		await this.prisma.lesson.delete({
			where: {
				id: lessonId,
				courseId,
			},
		});
	}
}
