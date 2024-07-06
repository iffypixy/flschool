import esession from "express-session";
import Store from "connect-redis";

import {redis} from "@lib/redis";

const MONTH = 2629800000;

export const session = () => {
	const store = new Store({client: redis.client});

	return esession({
		secret: process.env.SESSION_SECRET_KEY,
		resave: false,
		saveUninitialized: false,
		rolling: true,
		store,
		cookie: {
			maxAge: MONTH,
			httpOnly: true,
			sameSite: "none",
			secure: true,
		},
	});
};
