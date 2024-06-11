import {NestFactory} from "@nestjs/core";

import {AppModule} from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: process.env.CLIENT_ORIGIN.split(", "),
		},
	});

	await app.listen(+process.env.PORT);
}

bootstrap();
