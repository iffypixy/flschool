import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common";

import {IsAdmin} from "@modules/auth";
import {PrismaService} from "@lib/prisma";

import * as dtos from "../dtos";

@UseGuards(IsAdmin)
@Controller("admin/courses")
export class AdminCourseController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllCourses() {
		const courses = await this.prisma.course.findMany();

		return {
			courses,
		};
	}

	@Post("/")
	async createCourse(@Body() dto: dtos.CreateCourseDto) {
		const course = await this.prisma.course.create({
			data: {
				name: dto.name,
				hook: dto.hook,
				description: dto.description,
				completionPeriod: dto.completionPeriod,
				language: dto.language,
				preview: dto.preview,
				audience: dto.audience,
				type: dto.type,
				price: dto.price,
				authorId: dto.expertId,
			},
		});

		return {
			course,
		};
	}

	@Delete(":id")
	async removeCourse(@Param("id") id: string) {
		const course = await this.prisma.course.delete({
			where: {
				id,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		return {
			course,
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
				completionPeriod: dto.completionPeriod,
				preview: dto.preview,
				price: dto.price,
				type: dto.type,
				authorId: dto.expertId,
			},
		});

		return {
			course: updated,
		};
	}

	@Post(":id/lessons")
	async createCourseLesson(
		@Param("id") id: string,
		@Body() dto: dtos.CreateCourseLessonDto,
	) {
		const course = await this.prisma.course.findFirst({
			where: {
				id,
			},
		});

		if (!course) throw new NotFoundException("Course not found");

		const lessons = await this.prisma.courseLesson.count({
			where: {
				courseId: course.id,
			},
		});

		const lesson = await this.prisma.courseLesson.create({
			data: {
				name: dto.name,
				topics: dto.topics,
				order: lessons,
				video: dto.video,
				courseId: course.id,
			},
		});

		return {
			lesson,
		};
	}

	@Delete(":courseId/lessons/:lessonId")
	async removeCourseLesson(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
	) {
		const lesson = await this.prisma.courseLesson.delete({
			where: {
				id: lessonId,
				courseId: courseId,
			},
		});

		if (!lesson) throw new NotFoundException("Lesson not found");

		return {
			lesson,
		};
	}

	@Put(":courseId/lessons/:lessonId")
	async editCourseLesson(
		@Param("courseId") courseId: string,
		@Param("lessonId") lessonId: string,
		@Body() dto: dtos.EditCourseLessonDto,
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

		const updated = await this.prisma.courseLesson.update({
			where: {
				id: lesson.id,
			},
			data: {
				name: dto.name,
				topics: dto.topics,
			},
		});

		return {
			lesson: updated,
		};
	}
}
