import {IsInt, IsOptional, Min} from "class-validator";
import {Type} from "class-transformer";

export class PaginationDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(0)
	offset?: number = 0;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(0)
	limit?: number = 20;
}
