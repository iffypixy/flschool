import {IsEmail, IsString, Min, Max} from "class-validator";

export class SignUpDto {
	@IsEmail()
	email: string;

	@IsString()
	@Min(1)
	@Max(32)
	firstName: string;

	@IsString()
	@Min(1)
	@Max(32)
	lastName: string;

	@IsString()
	@Min(8)
	@Max(64)
	password: string;
}
