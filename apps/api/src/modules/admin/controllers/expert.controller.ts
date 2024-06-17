import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import * as bcrypt from "bcryptjs";

import {IsAdmin} from "@modules/auth";
import {PrismaService} from "@lib/prisma";
import {generatePassword} from "@lib/password";

import * as dtos from "../dtos";

@UseGuards(IsAdmin)
@Controller("admin/experts")
export class AdminExpertController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getAllExperts() {
		const experts = await this.prisma.expert.findMany();

		return {
			experts,
		};
	}

	@Post("/")
	async createExpert(@Body() dto: dtos.CreateExpertDto) {
		const password = generatePassword(16);

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = await this.prisma.user.create({
			data: {
				firstName: dto.firstName,
				lastName: dto.lastName,
				email: dto.email,
				password: hash,
				role: "EXPERT",
			},
		});

		const expert = await this.prisma.expert.create({
			data: {
				userId: user.id,
			},
		});

		/** @todo Send password on expert's email */

		return {
			expert: {
				...expert,
				plainPassword: password,
			},
		};
	}
}
