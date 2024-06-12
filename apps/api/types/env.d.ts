declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			CLIENT_ORIGIN: string;
			DATABASE_URL: string;
			SESSION_SECRET_KEY: string;
		}
	}
}

export {};
