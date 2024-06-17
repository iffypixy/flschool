import {Module} from "@nestjs/common";

import {
	AdminConsultationController,
	AdminCourseController,
	AdminExpertController,
	AdminVacancyController,
} from "./controllers";

@Module({
	controllers: [
		AdminCourseController,
		AdminExpertController,
		AdminVacancyController,
		AdminConsultationController,
	],
})
export class AdminModule {}
