import {IsEmail, IsString} from "class-validator";

export class CreateAdminDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsEmail()
	email: string;

	@IsString()
	secretKey: string;
}
