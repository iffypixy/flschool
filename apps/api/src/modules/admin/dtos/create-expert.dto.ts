import {IsEmail, IsString} from "class-validator";

export class CreateExpertDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsEmail()
	email: string;
}
