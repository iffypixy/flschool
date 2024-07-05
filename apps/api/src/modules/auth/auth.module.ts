import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";

import {OAuth2Module} from "@lib/oauth2";
import {PromocodeModule} from "@modules/promocode";

import {AuthLocalController, AuthOAuth2GoogleController} from "./controllers";
import {LoadUser} from "./middlewares/load-user.middleware";

@Module({
	imports: [OAuth2Module, PromocodeModule],
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
