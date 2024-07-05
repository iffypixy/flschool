import {
	IsEmail,
	IsString,
	IsOptional,
	MinLength,
	MaxLength,
} from "class-validator";

export class SignUpDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(1)
	@MaxLength(32)
	firstName: string;

	@IsString()
	@MinLength(1)
	@MaxLength(32)
	lastName: string;

	@IsString()
	@MinLength(8)
	@MaxLength(64)
	password: string;

	@IsString()
	@IsOptional()
	promocode?: string;
}
