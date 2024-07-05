import {Module} from "@nestjs/common";

import {AlumnusController} from "./alumnus.controller";

@Module({
	controllers: [AlumnusController],
})
export class AlumnusModule {}
