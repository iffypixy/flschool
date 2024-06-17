declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			CLIENT_ORIGIN: string;
			DATABASE_URL: string;
			SESSION_SECRET_KEY: string;
			REDIS_HOST: string;
			REDIS_PORT: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_REDIRECT_URI: string;
			GOOGLE_CREDENTIALS_URI: string;
			GOOGLE_AUTHORIZATION_URI: string;
			GOOGLE_TOKEN: string;
			GOOGLE_SCOPE: string;
			EMAIL_USER: string;
			EMAIL_PASS: string;
			AWS_S3_REGION: string;
			AWS_S3_PUBLIC_KEY: string;
			AWS_S3_SECRET_KEY: string;
		}
	}
}

export {};
