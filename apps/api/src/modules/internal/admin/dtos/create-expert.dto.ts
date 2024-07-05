import {IsEmail, IsOptional, IsString} from "class-validator";

export class CreateExpertDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	avatarFileId?: string;

	@IsString()
	about: string;
}
