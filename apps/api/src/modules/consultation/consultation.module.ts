import {Module} from "@nestjs/common";

import {ConsultationController} from "./consultation.controller";

@Module({
	controllers: [ConsultationController],
})
export class ConsultationModule {}
