import {Module} from "@nestjs/common";

import {ExpertController} from "./expert.controller";

@Module({
	controllers: [ExpertController],
})
export class ExpertModule {}
