import {IsString} from "class-validator";

export class CreateAlumnusDto {
	@IsString()
	avatarFileId: string;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	workplace: string;

	@IsString()
	courseId: string;

	@IsString()
	about: string;

	@IsString()
	incomeFileId: string;

	@IsString()
	certificateFileId: string;

	@IsString()
	reviewFileId: string;
}
