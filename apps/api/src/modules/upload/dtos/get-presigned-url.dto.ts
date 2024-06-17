import {Type} from "class-transformer";
import {IsInt, IsString} from "class-validator";

export class GetPresignedUrlDto {
	@IsString()
	contentType: string;

	@Type(() => Number)
	@IsInt()
	contentLength: number;
}
