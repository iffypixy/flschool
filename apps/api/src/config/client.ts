import {registerAs} from "@nestjs/config";

export const client = registerAs("client", () => ({
	origin: process.env.CLIENT_ORIGIN,
}));
