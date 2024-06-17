import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";

import {config} from "@config/index";
import {PrismaModule} from "@lib/prisma";
import {OAuth2Module} from "@lib/oauth2";
import {AuthModule} from "@modules/auth";
import {CourseModule} from "@modules/course";
import {ExpertModule} from "@modules/expert";
import {ProfileModule} from "@modules/profile";
import {VacancyModule} from "@modules/vacancy";
import {AdminModule} from "@modules/admin";
import {ConsultationModule} from "@modules/consultation";
import {UploadModule} from "@modules/upload";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config.client, config.oauth2],
			envFilePath: ".env",
			isGlobal: true,
		}),
		PrismaModule.forRoot(),
		OAuth2Module.forRoot(),
		AuthModule,
		CourseModule,
		ExpertModule,
		ProfileModule,
		VacancyModule,
		AdminModule,
		ConsultationModule,
		UploadModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
