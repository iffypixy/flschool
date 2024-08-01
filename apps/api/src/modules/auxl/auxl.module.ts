import {Module} from "@nestjs/common";

import {AuxlController} from "./auxl.controller";

@Module({
    controllers: [AuxlController],
})
export class AuxlModule {}
