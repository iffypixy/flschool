import {Body, Controller, Post} from "@nestjs/common";

import {PrismaService} from "@lib/prisma";

import * as dtos from "./dtos";

@Controller("consultations")
export class ConsultationController {
	constructor(private readonly prisma: PrismaService) {}

	@Post("/")
	async submitConsultationRequest(
		@Body() dto: dtos.SubmitConsultationRequestDto,
	) {
		await this.prisma.consultationRequest.create({
			data: {
				name: dto.name,
				phone: dto.phone,
			},
		});
	}
}
