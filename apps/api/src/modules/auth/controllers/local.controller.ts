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
import {PromocodeService} from "@modules/promocode";

import {IsAuthenticated} from "../guards/is-authenticated.guard";
import * as dtos from "../dtos";

@Controller("auth/local")
export class AuthLocalController {
	constructor(
		private readonly prisma: PrismaService,
		private readonly promocodeService: PromocodeService,
	) {}

	@Post("register")
	async signUp(
		@Body() dto: dtos.SignUpDto,
		@Session() session: SessionWithData,
	) {
		const existing = await this.prisma.user.findFirst({
			where: {
				email: dto.email,
			},
		});

		if (existing)
			throw new BadRequestException("Email has been already taken");

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(dto.password, salt);

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				firstName: dto.firstName,
				lastName: dto.lastName,
				password: hash,
			},
			include: {
				avatarFile: true,
			},
		});

		session.user = user;
		session.userId = user.id;

		await this.promocodeService.createPromocode(user.id);

		if (dto.promocode) {
			const promocode = await this.prisma.promocode.findFirst({
				where: {
					code: dto.promocode,
				},
			});

			if (promocode) {
				await this.prisma.promocodeUsage.create({
					data: {
						promocodeId: promocode.id,
						userId: user.id,
					},
				});
			}
		}

		return {
			credentials: sanitized.credentials(user),
		};
	}

	@Post("login")
	async signIn(
		@Body() dto: dtos.SignInDto,
		@Session() session: SessionWithData,
	) {
		const exception = new BadRequestException("Invalid credentials");

		const user = await this.prisma.user.findFirst({
			where: {
				email: dto.email,
			},
			include: {
				avatarFile: true,
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

	@UseGuards(IsAuthenticated)
	@Post("logout")
	logout(@Session() session: SessionWithData) {
		session.user = null;
		session.userId = null;
	}
}
