import {DynamicModule, Module} from "@nestjs/common";

import {OAuth2Service} from "./oauth2.service";
import {OAuth2Google} from "./providers";

@Module({
	providers: [OAuth2Service, OAuth2Google],
	exports: [OAuth2Service],
})
export class OAuth2Module {
	static forRoot(): DynamicModule {
		return {
			module: OAuth2Module,
		};
	}
}
