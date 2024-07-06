import {Module} from "@nestjs/common";

import {
	AdminController,
	AdminCourseController,
	AdminExpertController,
	AdminVacancyController,
	AdminAlumnusController,
	AdminUserController,
	AdminConsultationController,
} from "./controllers";

@Module({
	controllers: [
		AdminCourseController,
		AdminExpertController,
		AdminVacancyController,
		AdminController,
		AdminAlumnusController,
		AdminUserController,
		AdminConsultationController,
	],
})
export class InternalAdminModule {}
