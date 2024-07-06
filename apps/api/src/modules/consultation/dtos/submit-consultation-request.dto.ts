import {IsString} from "class-validator";

export class SubmitConsultationRequestDto {
	@IsString()
	name: string;

	@IsString()
	phone: string;
}
