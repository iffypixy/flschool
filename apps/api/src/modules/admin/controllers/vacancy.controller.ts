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
@Controller("admin/vacancies")
export class AdminVacancyController {
	constructor(private readonly prisma: PrismaService) {}

	@Post("/")
	async createVacancy(@Body() dto: dtos.CreateVacancyDto) {
		const vacancy = await this.prisma.vacancy.create({
			data: {
				position: dto.position,
				company: dto.company,
				avatar: dto.avatar,
				link: dto.link,
				salary: dto.salary,
				requiredExperience: dto.requiredExperience,
				employmentType: dto.employmentType,
				modalityType: dto.modalityType,
			},
		});

		return {
			vacancy,
		};
	}

	@Delete(":id")
	async removeVacancy(@Param("id") id: string) {
		const vacancy = await this.prisma.vacancy.delete({
			where: {
				id,
			},
		});

		if (!vacancy) throw new NotFoundException("Vacancy not found");

		return {
			vacancy,
		};
	}

	@Get("/")
	async getAllVacancies() {
		const vacancies = await this.prisma.vacancy.findMany();

		return {
			vacancies,
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
				avatar: dto.avatar,
				link: dto.link,
				salary: dto.salary,
				employmentType: dto.employmentType,
				modalityType: dto.modalityType,
				requiredExperience: dto.requiredExperience,
			},
		});

		return {
			vacancy: updated,
		};
	}
}
