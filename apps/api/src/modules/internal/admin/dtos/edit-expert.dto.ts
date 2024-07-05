import {IsEmail, IsOptional, IsString} from "class-validator";

export class EditExpertDto {
	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	avatarFileId?: string;

	@IsOptional()
	@IsString()
	about?: string;
}
