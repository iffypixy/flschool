import {IsOptional, IsString} from "class-validator";

export class EditAlumnusDto {
	@IsOptional()
	@IsString()
	avatarFileId?: string;

	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsOptional()
	@IsString()
	workplace?: string;

	@IsOptional()
	@IsString()
	courseId?: string;

	@IsOptional()
	@IsString()
	about?: string;

	@IsOptional()
	@IsString()
	incomeFileId?: string;

	@IsOptional()
	@IsString()
	certificateFileId?: string;

	@IsOptional()
	@IsString()
	reviewFileId?: string;
}
