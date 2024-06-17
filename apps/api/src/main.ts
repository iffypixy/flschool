import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";

import {session} from "@lib/session";

import {AppModule} from "./app.module";
import {s3} from "./lib/s3";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: process.env.CLIENT_ORIGIN.split(", "),
		},
	});

	app.useGlobalPipes(new ValidationPipe());

	app.use(session());

	console.log(s3.endpoint);

	await app.listen(+process.env.PORT);
}

bootstrap();
