import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const s3 = new AWS.S3({
	signatureVersion: "v4",
	region: process.env.AWS_S3_REGION,
	credentials: new AWS.Credentials({
		accessKeyId: process.env.AWS_S3_PUBLIC_KEY,
		secretAccessKey: process.env.AWS_S3_SECRET_KEY,
	}),
});

export const extractObject = (link: string) => {
	const url = new URL(link);
	const pathname = url.pathname;

	const objectKey = () => {
		const objectKey = pathname.substring(pathname.indexOf("/") + 1);

		return objectKey;
	};

	const fileExtension = () => {
		const name = path.basename(pathname);
		const extension = path.extname(name);

		return extension;
	};

	return {
		objectKey,
		fileExtension,
	};
};
