import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

import {s3} from "@lib/s3";

@Injectable()
export class UploadService {
	constructor(private readonly config: ConfigService) {}

	async getPresignedUrlToGet(key: string) {
		const url = await s3.getSignedUrlPromise("getObject", {
			Bucket: this.config.get<string>("s3.bucketName"),
			Expires: 60 * 60 * 3,
			Key: key,
		});

		return url;
	}
}
