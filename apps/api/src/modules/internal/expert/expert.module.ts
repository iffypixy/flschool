import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";

import {LoadUser} from "@modules/auth";

import {ExpertController} from "./expert.controller";

@Module({
	controllers: [ExpertController],
})
export class InternalExpertModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoadUser).forRoutes(ExpertController);
	}
}
