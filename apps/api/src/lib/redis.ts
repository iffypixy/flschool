import {Redis} from "ioredis";

import {Nullable} from "@lib/types";

export const redis: {
	client: Nullable<Redis>;
	setUp(): void;
} = {
	client: null,
	setUp() {
		this.client = new Redis({
			host: process.env.REDIS_HOST,
			port: +process.env.REDIS_PORT,
		});
	},
};
