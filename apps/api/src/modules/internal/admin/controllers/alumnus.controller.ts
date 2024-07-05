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
	UseGuards,
} from "@nestjs/common";

import {IsAdmin} from "@modules/auth";
import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

import * as dtos from "../dtos";

@UseGuards(IsAdmin)
@Controller("internal/admin/alumni")
export class AdminAlumnusController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllAlumni() {
		const alumni = await this.prisma.alumnus.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				course: {
					include: {
						previewFile: true,
					},
				},
				avatarFile: true,
				certificateFile: true,
				incomeFile: true,
				reviewFile: true,
			},
		});

		return {
			alumni: alumni.map(sanitized.alumnus),
		};
	}

	@Get(":id")
	async getAlumnus(@Param("id") id: string) {
		const alumnus = await this.prisma.alumnus.findFirst({
			where: {
				id,
			},
			include: {
				course: {
					include: {
						previewFile: true,
					},
				},
				avatarFile: true,
				certificateFile: true,
				incomeFile: true,
				reviewFile: true,
			},
		});

		if (!alumnus) throw new NotFoundException("Alumnus not found");

		return {
			alumnus: {
				...sanitized.alumnus(alumnus),
				avatar: sanitized.file(alumnus.avatarFile),
			},
		};
	}

	@Post("/")
	async createAlumnus(@Body() dto: dtos.CreateAlumnusDto) {
		const course = await this.prisma.course.findFirst({
			where: {
				id: dto.courseId,
			},
		});

		if (!course) throw new BadRequestException("Course not found");

		const alumnus = await this.prisma.alumnus.create({
			data: {
				avatarFileId: dto.avatarFileId,
				firstName: dto.firstName,
				lastName: dto.lastName,
				workplace: dto.workplace,
				about: dto.about,
				courseId: dto.courseId,
				incomeFileId: dto.incomeFileId,
				certificateFileId: dto.certificateFileId,
				reviewFileId: dto.reviewFileId,
			},
			include: {
				course: {
					include: {
						previewFile: true,
					},
				},
				avatarFile: true,
				incomeFile: true,
				certificateFile: true,
				reviewFile: true,
			},
		});

		return {
			alumnus: sanitized.alumnus(alumnus),
		};
	}

	@Put(":id")
	async editAlumnus(
		@Body() dto: dtos.EditAlumnusDto,
		@Param("id") id: string,
	) {
		const alumnus = await this.prisma.alumnus.findFirst({
			where: {
				id,
			},
		});

		if (!alumnus) throw new NotFoundException("Course not found");

		const updated = await this.prisma.alumnus.update({
			where: {
				id: alumnus.id,
			},
			data: {
				avatarFileId: dto.avatarFileId,
				firstName: dto.firstName,
				lastName: dto.lastName,
				workplace: dto.workplace,
				about: dto.about,
				courseId: dto.courseId,
				incomeFileId: dto.incomeFileId,
				certificateFileId: dto.certificateFileId,
				reviewFileId: dto.reviewFileId,
			},
			include: {
				course: {
					include: {
						previewFile: true,
					},
				},
				incomeFile: true,
				certificateFile: true,
				reviewFile: true,
				avatarFile: true,
			},
		});

		return {
			alumnus: sanitized.alumnus(updated),
		};
	}

	@Delete(":id")
	async deleteAlumnus(@Param("id") id: string) {
		await this.prisma.alumnus.delete({
			where: {
				id,
			},
		});
	}
}
