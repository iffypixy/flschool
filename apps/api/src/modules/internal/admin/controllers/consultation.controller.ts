import {Controller, Get} from "@nestjs/common";

import {PrismaService} from "@lib/prisma";

@Controller("internal/admin/consultations")
export class AdminConsultationController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllConsultationRequests() {
		const requests = await this.prisma.consultationRequest.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return {
			consultationRequests: requests,
		};
	}
}
