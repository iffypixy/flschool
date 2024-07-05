import {Module} from "@nestjs/common";

import {
	AdminController,
	AdminCourseController,
	AdminExpertController,
	AdminVacancyController,
	AdminAlumnusController,
	AdminUserController,
} from "./controllers";

@Module({
	controllers: [
		AdminCourseController,
		AdminExpertController,
		AdminVacancyController,
		AdminController,
		AdminAlumnusController,
		AdminUserController,
	],
})
export class InternalAdminModule {}
