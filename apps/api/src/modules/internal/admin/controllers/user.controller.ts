import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	UseGuards,
} from "@nestjs/common";

import {sanitized} from "@lib/sanitized";
import {PrismaService} from "@lib/prisma";
import {IsAdmin} from "@modules/auth";

import * as dtos from "../dtos";

@UseGuards(IsAdmin)
@Controller("internal/admin/users")
export class AdminUserController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllUsers() {
		const users = await this.prisma.user.findMany({
			where: {
				role: "USER",
			},
			include: {
				avatarFile: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return {
			users: users.map((u) => ({
				...sanitized.user(u),
				email: u.email,
			})),
		};
	}

	@Get(":id")
	async getUser(@Param("id") id: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				id,
				role: "USER",
			},
			include: {
				avatarFile: true,
			},
		});

		if (!user) throw new NotFoundException("User not found");

		const courses = await this.prisma.courseEnrollment.findMany({
			where: {
				userId: user.id,
			},
			select: {
				pack: true,
				courseId: true,
			},
		});

		return {
			user: {
				...sanitized.user(user),
				email: user.email,
				courses: {
					packs: courses.map((c) => c.pack).filter(Boolean),
					ids: courses.map((c) => c.courseId).filter(Boolean),
				},
			},
		};
	}

	@Post(":id/courses/packs/grant")
	async updateCoursePacksOfUser(
		@Param("id") id: string,
		@Body() dto: dtos.GrantCoursePackToUserDto,
	) {
		const user = await this.prisma.user.findFirst({
			where: {
				id,
			},
			select: {
				id: true,
			},
		});

		if (!user) throw new NotFoundException("User not found");

		await this.prisma.courseEnrollment.deleteMany({
			where: {
				userId: user.id,
				pack: {
					not: null,
				},
			},
		});

		for (let i = 0; i < dto.packs.length; i++) {
			const pack = dto.packs[i];

			const enrolled = await this.prisma.courseEnrollment.findFirst({
				where: {
					userId: user.id,
					pack,
				},
			});

			if (!enrolled) {
				await this.prisma.courseEnrollment.create({
					data: {
						userId: user.id,
						pack,
					},
				});
			}
		}
	}

	@Post(":userId/courses/grant")
	async updateCoursesOfUser(
		@Body() dto: dtos.GrantCourseToUserDto,
		@Param("userId") userId: string,
	) {
		const user = await this.prisma.user.findFirst({
			where: {
				id: userId,
			},
			select: {
				id: true,
			},
		});

		if (!user) throw new NotFoundException("User not found");

		await this.prisma.courseEnrollment.deleteMany({
			where: {
				userId: user.id,
				courseId: {
					not: null,
				},
			},
		});

		for (let i = 0; i < dto.courseIds.length; i++) {
			const courseId = dto.courseIds[i];

			const enrolled = await this.prisma.courseEnrollment.findFirst({
				where: {
					userId: user.id,
					courseId,
				},
			});

			if (!enrolled) {
				await this.prisma.courseEnrollment.create({
					data: {
						userId: user.id,
						courseId,
					},
				});
			}
		}
	}
}
