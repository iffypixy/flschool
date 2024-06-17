import {Controller, Get, Query} from "@nestjs/common";

import {PrismaService} from "@lib/prisma";
import {isUndefined} from "@lib/auxiliary";

import * as dtos from "./dtos";

@Controller("vacancies")
export class VacancyController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getVacancies(@Query() dto: dtos.GetVacanciesDto) {
		const valueOrUndefined = (value: any) =>
			isUndefined(value) ? undefined : value;

		const vacancies = await this.prisma.vacancy.findMany({
			where: {
				position: valueOrUndefined({
					contains: dto.positionQuery,
					mode: "insensitive",
				}),
				employmentType: valueOrUndefined({
					hasSome: dto.employmentType,
				}),
				modalityType: valueOrUndefined({
					hasSome: dto.modalityType,
				}),
				requiredExperience: valueOrUndefined({
					in: dto.requiredExperience,
				}),
				salary: valueOrUndefined({
					gte: dto.salaryFrom || 0,
					lte: dto.salaryTo || Infinity,
				}),
			},
			skip: dto.offset || 0,
			take: dto.limit || 20,
		});

		return {
			vacancies: {
				list: vacancies,
				total: vacancies.length,
			},
		};
	}
}
