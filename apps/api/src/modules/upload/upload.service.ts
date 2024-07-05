import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {S3} from "aws-sdk";
import {nanoid} from "nanoid";

import {s3} from "@lib/s3";

@Injectable()
export class UploadService {
	constructor(private readonly config: ConfigService) {}

	async getPresignedUrlToGet(key: string) {
		const url = await s3.getSignedUrlPromise("getObject", {
			Bucket: this.config.get<string>("s3.bucket"),
			Expires: 60 * 60 * 3,
			Key: key,
		});

		return url;
	}

	upload(
		buffer: Buffer,
		mimetype: string,
	): Promise<S3.ManagedUpload.SendData> {
		return new Promise((resolve) => {
			s3.upload(
				{
					ContentType: mimetype,
					Bucket: this.config.get("s3.bucket"),
					Key: nanoid(),
					Body: buffer,
				},
				(error, data) => {
					if (error) throw error;

					resolve(data);
				},
			);
		});
	}
}
