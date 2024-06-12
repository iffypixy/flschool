import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Session,
	UseGuards,
} from "@nestjs/common";
import {SessionWithData} from "express-session";
import bcrypt from "bcryptjs";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

import {IsAuthenticated} from "./is-authenticated.guard";
import * as dtos from "./dtos";

@Controller("auth")
export class AuthController {
	constructor(private readonly prisma: PrismaService) {}

	@Post("register")
	async signUp(
		@Body() dto: dtos.SignUpDto,
		@Session() session: SessionWithData,
	) {
		const exists =
			(await this.prisma.user.count({
				where: {
					email: dto.email,
				},
			})) > 0;

		if (exists)
			throw new BadRequestException("Provided email is already taken");

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(dto.password, salt);

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				firstName: dto.firstName,
				lastName: dto.lastName,
				password: hash,
			},
		});

		session.user = user;
		session.userId = user.id;

		return {
			credentials: sanitized.credentials(user),
		};
	}

	@Post("login")
	async signIn(
		@Body() dto: dtos.SignUpDto,
		@Session() session: SessionWithData,
	) {
		const exception = new BadRequestException("Invalid credentials");

		const user = await this.prisma.user.findFirst({
			where: {
				email: dto.email,
			},
		});

		if (!user) throw exception;

		const passwordsMatch = await bcrypt.compare(
			dto.password,
			user.password,
		);

		if (!passwordsMatch) throw exception;

		session.user = user;
		session.userId = user.id;

		return {
			credentials: sanitized.credentials(user),
		};
	}

	@UseGuards(IsAuthenticated)
	@Get("credentials")
	async getCredentials(@Session() session: SessionWithData) {
		return {
			credentials: sanitized.credentials(session.user),
		};
	}
}
