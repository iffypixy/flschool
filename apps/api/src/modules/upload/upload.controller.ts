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

import {IsAuthenticated} from "@modules/auth";
import {s3} from "@lib/s3";

import * as dtos from "./dtos";

@UseGuards(IsAuthenticated)
@Controller("upload")
export class UploadController {
	constructor(private readonly config: ConfigService) {}

	@Get("presigned/put")
	async getPresignedUrlToPut(
		@Session() session: SessionWithData,
		@Query() dto: dtos.GetPresignedUrlDto,
	) {
		const sizeInMB = dto.contentLength / (1024 ^ 2);
		const sizeLimitInMB = session.user.role === "ADMIN" ? Infinity : 50;

		if (sizeInMB > sizeLimitInMB)
			throw new BadRequestException("Provided file is too large");

		const type = dto.contentType.slice(dto.contentType.indexOf("/") + 1);

		const key = `${session.userId}/${nanoid()}.${type}`;

		const url = await s3.getSignedUrlPromise("putObject", {
			Bucket: this.config.get<string>("s3.bucketName"),
			ContentType: dto.contentType,
			ContentLength: dto.contentLength,
			Expires: 60 * 5,
			Key: key,
		});

		return {
			url,
			key,
		};
	}
}
