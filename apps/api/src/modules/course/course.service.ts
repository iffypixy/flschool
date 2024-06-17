import {Course} from "@prisma/client";

import {PaginationDto} from "@lib/dtos";
import {PrismaService} from "@lib/prisma";

export class CourseService {
	constructor(private readonly prisma: PrismaService) {}

	async loadCourses(type: Course["type"], query: PaginationDto) {
		const minReviews = 0;
		const avgRating = 4;

		const total = await this.prisma.course.count({
			where: {
				type,
			},
		});

		const courses = await this.prisma.$queryRaw`
			SELECT
				c.*,
				AVG(r.rating) AS rating,
				COUNT(cr.id) AS reviews,
				(
					(COUNT(cr.id) * AVG(r.rating)) + (${minReviews} * ${avgRating}))
					/
					(COUNT(cr.id) + ${minReviews}
				) AS score
			FROM
				"Course" c
			JOIN
				"CourseReview" cr ON c."id" = cr."courseId"
			JOIN
				"Review" r ON cr."reviewId" = r."id"
			WHERE
				c."type" = '${type}'
			GROUP BY
				c."id"
			ORDER BY
				score DESC
			LIMIT
				${query.limit}
			OFFSET
				${query.offset};
		`;

		return {courses, total};
	}
}
