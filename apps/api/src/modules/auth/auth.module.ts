import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";

import {AuthController} from "./auth.controller";
import {LoadUser} from "./load-user.middleware";

@Module({
	controllers: [AuthController],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoadUser).forRoutes({
			method: RequestMethod.GET,
			path: "/auth/credentials",
		});
	}
}
