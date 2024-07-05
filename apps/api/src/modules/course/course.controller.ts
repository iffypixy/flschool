import {
	BadRequestException,
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Session,
	UseGuards,
} from "@nestjs/common";
import {Course} from "@prisma/client";
import {SessionWithData} from "express-session";

import {sanitized} from "@lib/sanitized";
import {PrismaService} from "@lib/prisma";
import {extractObject} from "@lib/s3";
import {IsAuthenticated} from "@modules/auth";
import {UploadService} from "@modules/upload";

import {generateCertificatePdf} from "./lib/certificate";
import {CourseService} from "./course.service";
import {PACK_PRICE} from "./course.constants";
import * as dtos from "./dtos";

@Controller("courses")
export class CourseController {
	constructor(
		private readonly prisma: PrismaService,
		private readonly service: CourseService,
		private readonly uploadService: UploadService,
	) {}

	@Get("fl-teens")
	async getFlTeensCourses() {
		const {courses} = await this.service.loadCourses("FL_TEENS");

		return {
			courses,
		};
	}

	@Get("education")
	async getEducationCourses() {
		const {courses} = await this.service.loadCourses("EDUCATION");

		return {
			courses,
		};
	}

	@Get("language")
	async getLanguageCourses() {
		const {courses} = await this.service.loadCourses("LANGUAGE");

		return {
			courses,
		};
	}

	@Get("popular")
	async getPopularCourses() {
		const courses = (await this.prisma.$queryRaw`
			SELECT
				c.*,
				COUNT(cr.id)::integer AS reviews,
				COUNT(l.id)::integer AS lessons
			FROM
				"Course" c
			LEFT JOIN
				"CourseReview" cr ON c."id" = cr."courseId"
			LEFT JOIN
				"Review" r ON cr."reviewId" = r."id"
			LEFT JOIN
				"Lesson" l ON l."courseId" = c."id"
			GROUP BY
				c."id"
			ORDER BY
				reviews DESC;
		`) as Array<
			Course & {
				reviews: number;
				lessons: number;
			}
		>;

		return {
			courses,
		};
	}

	@Get("names")
	async getCourseNames() {
		const courses = await this.prisma.course.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return {
			courses,
		};
	}

	@Get(":id")
	async getCourse(
		@Param("id") id: string,
		@Session() session: SessionWithData,
	) {
		const userId = session.userId || null;

		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
			include: {
				reviews: {
					include: {
						review: true,
					},
				},
				author: {
					include: {
						user: {
							include: {
								avatarFile: true,
							},
						},
					},
				},
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lessons = await this.prisma.lesson.findMany({
			where: {
				courseId: course.id,
			},
			select: {
				id: true,
				name: true,
				topics: true,
				order: true,
			},
			orderBy: {
				order: "asc",
			},
		});

		const authorStudents = await this.prisma.studentProgress.count({
			where: {
				course: {
					authorId: course.authorId,
				},
			},
		});

		const authorCourses = await this.prisma.course.count({
			where: {
				authorId: course.authorId,
			},
		});

		const authorReviews = await this.prisma.expertReview.findMany({
			where: {
				expertId: course.authorId,
			},
			select: {
				review: true,
			},
		});

		const authorRating =
			authorReviews
				.map((er) => er.review.rating)
				.reduce((prev, rating) => prev + rating, 0) /
			(authorReviews.length || 1);

		const reviews = await this.prisma.courseReview.findMany({
			where: {
				courseId: course.id,
			},
			select: {
				review: true,
			},
		});

		const rating =
			reviews
				.map((cr) => cr.review.rating)
				.reduce((prev, rating) => prev + rating, 0) /
			(reviews.length || 1);

		const positiveReviews =
			(reviews.filter((cr) => cr.review.rating >= 4).length /
				(reviews.length || 1)) *
			100;

		const isUserEnrolled =
			userId &&
			(await this.prisma.courseEnrollment.findFirst({
				where: {
					userId: {
						equals: userId,
					},
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

		const {progress} = (userId &&
			(await this.prisma.studentProgress.findFirst({
				where: {
					userId,
					courseId: course.id,
				},
				select: {
					progress: true,
				},
			}))) || {progress: 0};

		const currentLessonId = isUserEnrolled ? lessons[progress]?.id : null;

		return {
			course: {
				...course,
				price: course.price || PACK_PRICE[course.type],
				author: {
					...sanitized.expert(course.author),
					students: authorStudents,
					courses: authorCourses,
					rating: authorRating,
				},
				lessons,
				rating,
				reviews: reviews.length,
				positiveReviews,
				isEnrolled: isUserEnrolled,
				progress,
				currentLessonId,
			},
		};
	}

	@UseGuards(IsAuthenticated)
	@Get(":courseId/lessons/:lessonId")
	async getLesson(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Session() session: SessionWithData,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id: courseId,
			},
			include: {
				lessons: {
					orderBy: {
						order: "asc",
					},
				},
				previewFile: true,
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

		const isReviewedByUser = !!(await this.prisma.lessonReview.findFirst({
			where: {
				lessonId: lesson.id,
				userId: session.userId,
			},
		}));

		const video = await this.uploadService.getPresignedUrlToGet(
			extractObject(lesson.videoFile.url).objectKey(),
		);

		return {
			lesson: {
				...sanitized.lesson(lesson),
				video,
				homework: {
					...sanitized.homework(homework),
					answer: answer && {
						...sanitized.homeworkAnswer(answer),
						feedback:
							answer.feedback &&
							sanitized.homeworkAnswerFeedback(answer.feedback),
					},
				},
				isReviewed: isReviewedByUser,
				course: {
					...sanitized.course(course),
					lessons: course.lessons.map(sanitized.lesson),
					progress,
				},
			},
		};
	}

	@UseGuards(IsAuthenticated)
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

		await this.prisma.courseReview.create({
			data: {
				userId: session.userId,
				courseId: course.id,
				feedback: dto.comment,
				reviewId: review.id,
			},
		});

		const expertReview = await this.prisma.review.create({
			data: {
				rating: dto.expertRating,
			},
		});

		await this.prisma.expertReview.create({
			data: {
				userId: session.userId,
				expertId: course.authorId,
				comment: dto.comment,
				reviewId: expertReview.id,
			},
		});
	}

	@UseGuards(IsAuthenticated)
	@Post(":courseId/lessons/:lessonId/reviews")
	async reviewLesson(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Body() dto: dtos.ReviewLessonDto,
		@Session() session: SessionWithData,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id: courseId,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lesson = await this.prisma.lesson.findFirst({
			where: {
				id: lessonId,
				courseId: course.id,
			},
		});

		if (!lesson) throw new NotFoundException("Lesson not found");

		const review = await this.prisma.review.create({
			data: {
				rating: +dto.rating,
			},
		});

		await this.prisma.lessonReview.create({
			data: {
				userId: session.userId,
				lessonId: lesson.id,
				reviewId: review.id,
			},
		});
	}

	@UseGuards(IsAuthenticated)
	@Get(":id/certificate")
	async getCourseCertificate(
		@Param("id") id: string,
		@Session() session: SessionWithData,
	) {
		const student = await this.prisma.studentProgress.findFirst({
			where: {
				userId: session.userId,
				courseId: id,
			},
		});

		if (!student)
			throw new BadRequestException("You can't access this course");

		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lessons = await this.prisma.lesson.count({
			where: {
				courseId: course.id,
			},
		});

		const isCourseCompleted = student.progress >= lessons;

		if (!isCourseCompleted)
			throw new BadRequestException("User hasn't completed the course");

		const isReviewed = !!(await this.prisma.courseReview.findFirst({
			where: {
				courseId: course.id,
				userId: session.userId,
			},
		}));

		if (!isReviewed)
			return {
				isReviewed: false,
				certificate: null,
			};

		const pdf = await generateCertificatePdf(
			`${session.user.firstName} ${session.user.lastName}`,
			course.name,
		);

		const {Location: certificate} = await this.uploadService.upload(
			pdf,
			"application/pdf",
		);

		return {
			isReviewed: true,
			certificate,
		};
	}
}
