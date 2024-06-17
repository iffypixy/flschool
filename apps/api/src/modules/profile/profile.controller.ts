import {Controller, Get, Session, UseGuards} from "@nestjs/common";
import {SessionWithData} from "express-session";

import {PrismaService} from "@lib/prisma";
import {IsAuthenticated} from "@modules/auth";

@UseGuards(IsAuthenticated)
@Controller("profile")
export class ProfileController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("me/courses/in-progress")
	async getMyInProgressCourses(@Session() session: SessionWithData) {
		const courses = await this.prisma.$queryRaw`
			SELECT
				c.*,
				COUNT(cl.id) AS lessons
			FROM
				"Course" c
			JOIN
				"Student" s ON c."id" = s."courseId" AND s."userId" = ${session.userId}
			LEFT JOIN
				"CourseLesson" cl ON c."id" = cl."courseId"
			GROUP BY
				c."id"
			HAVING
				s."progress" = COUNT(cl."id")
		`;

		return {
			courses,
		};
	}

	@Get("me/courses/completed")
	async getMyCompletedCourses(@Session() session: SessionWithData) {
		const courses = await this.prisma.$queryRaw`
			SELECT
				c.*,
				COUNT(cl.id) AS lessons,
				s.progress
			FROM
				"Course" c
			JOIN
				"Student" s ON c."id" = s."courseId" AND s."userId" = ${session.userId}
			LEFT JOIN
				"CourseLesson" cl ON c."id" = cl."courseId"
			GROUP BY
				c."id"
			HAVING
				s."progress" = COUNT(cl."id")
		`;

		return {
			courses,
		};
	}
}
