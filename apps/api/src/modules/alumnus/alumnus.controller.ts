import {Controller, Get, NotFoundException, Param} from "@nestjs/common";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

@Controller("alumni")
export class AlumnusController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAlumni() {
		const alumni = await this.prisma.alumnus.findMany({
			include: {
				course: true,
				incomeFile: true,
				certificateFile: true,
				reviewFile: true,
				avatarFile: true,
			},
		});

		return {
			alumni: alumni.map(sanitized.alumnus),
		};
	}

	@Get("/:id")
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
				incomeFile: true,
				certificateFile: true,
				reviewFile: true,
				avatarFile: true,
			},
		});

		if (!alumnus) throw new NotFoundException("Alumnus not found");

		return {
			alumnus: sanitized.alumnus(alumnus),
		};
	}
}
