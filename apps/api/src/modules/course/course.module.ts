import {Module} from "@nestjs/common";

import {UploadModule} from "@modules/upload";

import {CourseController} from "./course.controller";
import {CourseService} from "./course.service";

@Module({
	imports: [UploadModule],
	controllers: [CourseController],
	providers: [CourseService],
})
export class CourseModule {}
