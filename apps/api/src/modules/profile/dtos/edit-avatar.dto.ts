import {IsString} from "class-validator";

export class EditAvatarDto {
	@IsString()
	avatarFileId: string;
}
