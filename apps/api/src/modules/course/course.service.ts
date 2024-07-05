import {Course, Prisma} from "@prisma/client";
import {Injectable} from "@nestjs/common";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

@Injectable()
export class CourseService {
	constructor(private readonly prisma: PrismaService) {}

	async loadCourses(type: Course["type"]) {
		const courses = await this.prisma.course.findMany({
			where: {
				type,
			},
			include: {
				previewFile: true,
				reviews: {
					include: {
						review: true,
					},
				},
			},
		});

		const list: Array<{
			course: Prisma.CourseGetPayload<{
				include: {
					previewFile: true;
				};
			}>;
			reviews: number;
			rating: number;
		}> = [];

		courses.forEach((c) => {
			list.push({
				course: c,
				reviews: c.reviews.length,
				rating:
					c.reviews
						.map((cr) => cr.review.rating)
						.reduce((prev, rating) => prev + rating, 0) /
					(c.reviews.length || 1),
			});
		});

		list.sort((a, b) => b.rating - a.rating);

		return {
			courses: list.map(({course, reviews, rating}) => ({
				...sanitized.course(course),
				reviews,
				rating,
			})),
		};
	}
}
