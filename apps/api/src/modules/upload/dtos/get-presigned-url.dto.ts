import {IsNumberString, IsString} from "class-validator";

export class GetPresignedUrlDto {
	@IsString()
	contentType: string;

	@IsNumberString()
	contentLength: string;

	@IsString()
	name: string;
}
