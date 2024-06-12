import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";

import {session} from "@lib/session";
import {redis} from "@lib/redis";

import {AppModule} from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: process.env.CLIENT_ORIGIN.split(", "),
		},
	});

	app.useGlobalPipes(new ValidationPipe());

	redis.setUp();

	app.use(session());

	await app.listen(+process.env.PORT);
}

bootstrap();
