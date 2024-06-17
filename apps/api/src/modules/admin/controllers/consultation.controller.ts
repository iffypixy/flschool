import {Controller, Get, UseGuards} from "@nestjs/common";

import {IsAdmin} from "@modules/auth";
import {PrismaService} from "@lib/prisma";

@UseGuards(IsAdmin)
@Controller("admin/consultations")
export class AdminConsultationController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllConsultationRequests() {
		const consultationRequests =
			await this.prisma.consultationRequest.findMany();

		return {
			consultationRequests,
		};
	}
}
