import {Module} from "@nestjs/common";

import {PromocodeService} from "./promocode.service";

@Module({
	providers: [PromocodeService],
	exports: [PromocodeService],
})
export class PromocodeModule {}
