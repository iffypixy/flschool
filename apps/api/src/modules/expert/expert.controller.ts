import {Controller, Get, Query} from "@nestjs/common";

import {PaginationDto} from "@lib/dtos";
import {PrismaService} from "@lib/prisma";

@Controller("experts")
export class ExpertController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getExperts(@Query() query: PaginationDto) {
		const minStudents = 0;
		const avgRating = 4;

		const experts = await this.prisma.$queryRaw`
			SELECT
				e.*,
				AVG(rv.rating) AS rating,
				COUNT(DISTINCT s.user_id) AS students,
				COUNT(DISTINCT c.id) AS courses,
				((COUNT(DISTINCT s.id) * AVG(r.rating)) + (${minStudents} * ${avgRating})) /
				(COUNT(DISTINCT s.id) + ${minStudents}) AS score
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
			GROUP BY
				e.id
			ORDER BY
				score DESC
			LIMIT
				${query.limit}
			OFFSET
				${query.offset};
		`;

		return {
			experts,
		};
	}
}
