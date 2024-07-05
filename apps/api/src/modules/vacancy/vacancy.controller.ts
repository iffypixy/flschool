import {Controller, Get} from "@nestjs/common";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

@Controller("vacancies")
export class VacancyController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getVacancies() {
		const vacancies = await this.prisma.vacancy.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return {
			vacancies: vacancies.map(sanitized.vacancy),
		};
	}
}
