import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";

import {config} from "@config/index";
import {PrismaModule} from "@lib/prisma";
import {OAuth2Module} from "@lib/oauth2";
import {AuthModule} from "@modules/auth";
import {AlumnusModule} from "@modules/alumnus";
import {CourseModule} from "@modules/course";
import {ExpertModule} from "@modules/expert";
import {HomeworkModule} from "@modules/homework";
import {ProfileModule} from "@modules/profile";
import {PromocodeModule} from "@modules/promocode";
import {UploadModule} from "@modules/upload";
import {VacancyModule} from "@modules/vacancy";
import {InternalAdminModule} from "@modules/internal/admin";
import {InternalExpertModule} from "@modules/internal/expert";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config.client, config.oauth2, config.s3],
			envFilePath: ".env",
			isGlobal: true,
		}),
		PrismaModule.forRoot(),
		OAuth2Module,
		AuthModule,
		AlumnusModule,
		CourseModule,
		ExpertModule,
		HomeworkModule,
		ProfileModule,
		PromocodeModule,
		UploadModule,
		VacancyModule,
		InternalAdminModule,
		InternalExpertModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
