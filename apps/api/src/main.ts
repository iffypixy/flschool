import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";

import {session} from "@lib/session";

import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: process.env.CLIENT_ORIGIN.split(", "),
            credentials: true,
        },
    });

    app.setGlobalPrefix("api");

    app.useGlobalPipes(new ValidationPipe());

    app.use(session());

    await app.listen(+process.env.PORT);
}

bootstrap();
