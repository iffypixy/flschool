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

import {sanitized} from "@lib/sanitized";
import {PrismaService} from "@lib/prisma";
import {IsAdmin} from "@modules/auth";

import * as dtos from "../dtos";

@UseGuards(IsAdmin)
@Controller("internal/admin/vacancies")
export class AdminVacancyController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllVacancies() {
		const vacancies = await this.prisma.vacancy.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return {
			vacancies: vacancies.map(sanitized.vacancy),
		};
	}

	@Get(":id")
	async getVacancy(@Param("id") id: string) {
		const vacancy = await this.prisma.vacancy.findFirst({
			where: {
				id,
			},
		});

		if (!vacancy) throw new NotFoundException("Vacancy not found");

		return {
			vacancy: sanitized.vacancy(vacancy),
		};
	}

	@Post("/")
	async createVacancy(@Body() dto: dtos.CreateVacancyDto) {
		const vacancy = await this.prisma.vacancy.create({
			data: {
				position: dto.position,
				company: dto.company,
				link: dto.link,
				salary: +dto.salary,
				requiredExperience: dto.requiredExperience,
				employmentType: dto.employmentType,
				modalityType: dto.modalityType,
			},
		});

		return {
			vacancy,
		};
	}

	@Put(":id")
	async editVacancy(
		@Param("id") id: string,
		@Body() dto: dtos.EditVacancyDto,
	) {
		const vacancy = await this.prisma.vacancy.findFirst({
			where: {
				id,
			},
		});

		if (!vacancy) throw new NotFoundException("Vacancy not found");

		const updated = await this.prisma.vacancy.update({
			where: {
				id: vacancy.id,
			},
			data: {
				position: dto.position,
				company: dto.company,
				link: dto.link,
				salary: dto.salary,
				employmentType: dto.employmentType,
				modalityType: dto.modalityType,
				requiredExperience: dto.requiredExperience,
			},
		});

		return {
			vacancy: sanitized.vacancy(updated),
		};
	}

	@Delete(":id")
	async deleteVacancy(@Param("id") id: string) {
		await this.prisma.vacancy.delete({
			where: {
				id,
			},
		});
	}
}
