import {Controller, Get, NotFoundException, Param} from "@nestjs/common";
import {Prisma} from "@prisma/client";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

@Controller("experts")
export class ExpertController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getExperts() {
		const experts = await this.prisma.expert.findMany({
			include: {
				user: {
					include: {
						avatarFile: true,
					},
				},
				reviews: {
					include: {
						review: true,
					},
				},
			},
		});

		const list: Array<{
			expert: Prisma.ExpertGetPayload<{
				include: {
					user: {
						include: {
							avatarFile: true;
						};
					};
				};
			}>;
			students: number;
			courses: number;
			rating: number;
		}> = [];

		for (let i = 0; i < experts.length; i++) {
			const expert = experts[i];

			const students = await this.prisma.studentProgress.count({
				where: {
					course: {
						authorId: expert.id,
					},
				},
			});

			const courses = await this.prisma.course.count({
				where: {
					authorId: expert.id,
				},
			});

			const rating =
				expert.reviews
					.map((er) => er.review.rating)
					.reduce((prev, rating) => prev + rating, 0) /
				(expert.reviews.length || 1);

			list.push({
				expert,
				students,
				rating,
				courses,
			});
		}

		const mapped = list.map(({expert, students, courses, rating}) => ({
			...sanitized.expert(expert),
			students,
			courses,
			rating,
		}));

		mapped.sort((a, b) => b.rating - a.rating);

		return {
			experts: mapped,
		};
	}

	@Get("/:id")
	async getExpert(@Param("id") id: string) {
		const expert = await this.prisma.expert.findFirst({
			where: {
				id,
			},
			include: {
				user: {
					include: {
						avatarFile: true,
					},
				},
				reviews: {
					include: {
						review: true,
					},
				},
			},
		});

		if (!expert) throw new NotFoundException("Expert not found");

		const students = await this.prisma.studentProgress.count({
			where: {
				course: {
					authorId: expert.id,
				},
			},
		});

		const courses = await this.prisma.course.count({
			where: {
				authorId: expert.id,
			},
		});

		const rating =
			expert.reviews
				.map((er) => er.review.rating)
				.reduce((prev, rating) => prev + rating, 0) /
			(expert.reviews.length || 1);

		return {
			expert: {
				...sanitized.expert(expert),
				students,
				courses,
				rating,
			},
		};
	}
}
