import {
	BadRequestException,
	Controller,
	Get,
	Query,
	Session,
	UseGuards,
} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SessionWithData} from "express-session";
import {nanoid} from "nanoid";
import {User} from "@prisma/client";

import {IsAuthenticated} from "@modules/auth";
import {s3} from "@lib/s3";
import {PrismaService} from "@lib/prisma";

import * as dtos from "./dtos";

@UseGuards(IsAuthenticated)
@Controller("uploads")
export class UploadController {
	private readonly MAX_FILE_SIZE: Record<User["role"], number> = {
		ADMIN: Math.pow(1024, 3) * 3,
		EXPERT: Math.pow(1024, 3) * 1,
		USER: Math.pow(1024, 2) * 20,
	};

	constructor(
		private readonly config: ConfigService,
		private readonly prisma: PrismaService,
	) {}

	@Get("presigned/put")
	async getPresignedUrlToPut(
		@Session() session: SessionWithData,
		@Query() dto: dtos.GetPresignedUrlDto,
	) {
		const maxFileSize = this.MAX_FILE_SIZE[session.user.role];

		if (+dto.contentLength > maxFileSize)
			throw new BadRequestException("Provided file is too large");

		const type = dto.contentType.slice(dto.contentType.indexOf("/") + 1);

		const key = `${session.userId}/${nanoid()}.${type}`;

		const url = await s3.getSignedUrlPromise("putObject", {
			Bucket: this.config.get<string>("s3.bucket"),
			Expires: 60 * 5,
			Key: key,
			ContentType: dto.contentType,
		});

		const s3BaseUrl = this.config.get<string>("s3.url");

		const file = await this.prisma.file.create({
			data: {
				userId: session.userId,
				name: dto.name,
				url: `${s3BaseUrl}/${key}`,
			},
		});

		return {
			url,
			key,
			fileId: file.id,
		};
	}
}
