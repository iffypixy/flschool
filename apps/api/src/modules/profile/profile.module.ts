import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";

import {LoadUser} from "@modules/auth";

import {ProfileController} from "./profile.controller";

@Module({
	controllers: [ProfileController],
})
export class ProfileModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoadUser).forRoutes(ProfileController);
	}
}
