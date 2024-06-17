import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";

import {OAuth2Module} from "@lib/oauth2";

import {AuthLocalController, AuthOAuth2GoogleController} from "./controllers";
import {LoadUser} from "./load-user.middleware";

@Module({
	imports: [OAuth2Module],
	controllers: [AuthLocalController, AuthOAuth2GoogleController],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoadUser).forRoutes({
			method: RequestMethod.GET,
			path: "/auth/credentials",
		});
	}
}
