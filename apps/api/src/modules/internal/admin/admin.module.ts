import {Module} from "@nestjs/common";

import {PromocodeModule} from "@modules/promocode";

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
    imports: [PromocodeModule],
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
