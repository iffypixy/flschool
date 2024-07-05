import {Module} from "@nestjs/common";

import {HomeworkController} from "./homework.controller";

@Module({
	controllers: [HomeworkController],
})
export class HomeworkModule {}
