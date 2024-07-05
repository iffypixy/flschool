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
import bcrypt from "bcryptjs";

import {PrismaService} from "@lib/prisma";
import {generatePassword} from "@lib/password";
import {sanitized} from "@lib/sanitized";
import {IsAdmin} from "@modules/auth";

import * as dtos from "../dtos";
import {Expert} from "@prisma/client";

@UseGuards(IsAdmin)
@Controller("internal/admin/experts")
export class AdminExpertController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllExperts() {
		const experts = await this.prisma.expert.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				user: {
					include: {
						avatarFile: true,
					},
				},
			},
		});

		return {
			experts: experts.map(sanitized.expert),
		};
	}

	@Delete(":id")
	async deleteExpert(@Param("id") id: string) {
		await this.prisma.expert.delete({
			where: {
				id,
			},
		});
	}

	@Post("/")
	async createExpert(@Body() dto: dtos.CreateExpertDto) {
		const existing = await this.prisma.user.findFirst({
			where: {
				email: {
					mode: "insensitive",
					equals: dto.email,
				},
			},
		});

		if (existing) throw new BadRequestException("Email is already taken");

		const password = generatePassword(16);

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = await this.prisma.user.create({
			data: {
				firstName: dto.firstName,
				lastName: dto.lastName,
				email: dto.email,
				password: hash,
				role: "EXPERT",
				avatarFileId: dto.avatarFileId,
			},
		});

		const expert = await this.prisma.expert.create({
			data: {
				userId: user.id,
				plainPassword: password,
				about: dto.about,
			},
			include: {
				user: {
					include: {
						avatarFile: true,
					},
				},
			},
		});

		return {
			expert: sanitized.expert(expert),
		};
	}

	@Put(":id")
	async editExpert(@Body() dto: dtos.EditExpertDto, @Param("id") id: string) {
		const expert = await this.prisma.expert.findFirst({
			where: {
				id,
			},
			select: {
				id: true,
				userId: true,
			},
		});

		if (!expert) throw new NotFoundException("Expert not found");

		const emailProvided = !!dto.email;

		if (emailProvided) {
			const existing = await this.prisma.user.findFirst({
				where: {
					email: {
						mode: "insensitive",
						equals: dto.email,
					},
				},
			});

			if (existing)
				throw new BadRequestException("Email is already taken");
		}

		await this.prisma.user.update({
			where: {
				id: expert.userId,
			},
			data: {
				email: dto.email,
				firstName: dto.firstName,
				lastName: dto.lastName,
				avatarFileId: dto.avatarFileId,
			},
		});

		const updated = await this.prisma.expert.update({
			where: {
				id: expert.id,
			},
			data: {
				about: dto.about,
			},
			include: {
				user: {
					include: {
						avatarFile: true,
					},
				},
			},
		});

		return {
			expert: sanitized.expert(updated),
		};
	}

	@Get("/search")
	async searchExperts(@Query("query") query: string) {
		if (!query)
			return {
				experts: [],
			};

		const experts = await this.prisma.expert.findMany({
			where: {
				user: {
					OR: [
						{
							firstName: {
								mode: "insensitive",
								startsWith: query,
							},
						},
						{
							lastName: {
								mode: "insensitive",
								startsWith: query,
							},
						},
					],
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

		return {
			experts: experts.map(sanitized.expert),
		};
	}

	@Get(":id")
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
			},
		});

		if (!expert) throw new NotFoundException("Expert not found");

		return {
			expert: {
				...sanitized.expert(expert),
				avatar:
					expert.user.avatarFile &&
					sanitized.file(expert.user.avatarFile),
				plainPassword: expert.plainPassword,
			},
		};
	}

	@Get("reviews/metrics")
	async getExpertReviewMetrics() {
		const experts = (await this.prisma.$queryRaw`
			SELECT
				e.*,
				AVG(r.rating)::integer AS rating,
				COUNT(er."reviewId")::integer AS reviews
			FROM
				"Expert" e
			LEFT JOIN
				"ExpertReview" er ON e."id" = er."expertId"
			LEFT JOIN
				"Review" r ON er."reviewId" = r."id"
			GROUP BY
				e."id"
	  `) as Array<
			Expert & {
				rating: number;
				reviews: number;
			}
		>;

		const list = [];

		for (let i = 0; i < experts.length; i++) {
			const expert = experts[i];

			const user = await this.prisma.user.findFirst({
				where: {
					id: expert.userId,
				},
			});

			list.push({
				id: expert.id,
				firstName: user.firstName,
				lastName: user.lastName,
				rating: expert.rating || 0,
				reviews: expert.reviews || 0,
			});
		}

		return {
			metrics: list,
		};
	}
}
