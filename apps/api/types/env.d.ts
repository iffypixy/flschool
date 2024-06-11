declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			CLIENT_ORIGIN: string;
		}
	}
}

export {};
