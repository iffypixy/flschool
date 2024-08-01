import {Body, Controller, Get, Post} from "@nestjs/common";

const data = [];

@Controller("auxl")
export class AuxlController {
    @Get()
    get() {
        return data;
    }

    @Post()
    push(@Body() dto: unknown) {
        data.push(dto);

        return data;
    }
}
