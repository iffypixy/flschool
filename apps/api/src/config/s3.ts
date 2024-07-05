import {registerAs} from "@nestjs/config";

export const s3 = registerAs("s3", () => ({
	bucket: process.env.AWS_S3_BUCKET,
	url: process.env.AWS_S3_URL,
}));
