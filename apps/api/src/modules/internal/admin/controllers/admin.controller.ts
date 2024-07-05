import {
	BadRequestException,
	Body,
	Controller,
	Post,
	UseGuards,
} from "@nestjs/common";
import bcrypt from "bcryptjs";

import {IsAdmin} from "@modules/auth";
import {PrismaService} from "@lib/prisma";
import {generatePassword} from "@lib/password";
import {sanitized} from "@lib/sanitized";

import * as dtos from "../dtos";

@UseGuards(IsAdmin)
@Controller("internal/admins")
export class AdminController {
	constructor(private readonly prisma: PrismaService) {}

	@Post("/")
	async createAdmin(@Body() dto: dtos.CreateAdminDto) {
		const secretKeyValid = dto.secretKey === process.env.SECRET_KEY;

		if (!secretKeyValid) throw new BadRequestException("No permissions");

		const existing = await this.prisma.user.findFirst({
			where: {
				email: dto.email,
			},
		});

		if (existing)
			throw new BadRequestException("Email has been already taken");

		const password = generatePassword(16);

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const admin = await this.prisma.user.create({
			data: {
				email: dto.email,
				firstName: dto.firstName,
				lastName: dto.lastName,
				password: hash,
				role: "ADMIN",
			},
			include: {
				avatarFile: true,
			},
		});

		return {
			admin: {
				...sanitized.user(admin),
				plainPassword: password,
			},
		};
	}
}
