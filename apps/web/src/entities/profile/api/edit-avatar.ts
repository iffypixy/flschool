import {Viewer} from "@entities/viewer";
import {Dto, apiClient} from "@shared/api";

export type EditAvatarDto = Dto<
	{
		avatarFileId: string;
	},
	{
		credentials: Viewer;
	}
>;

export const editAvatar = (req: EditAvatarDto["req"]) =>
	apiClient.put<EditAvatarDto["res"]>("/api/profile/me/avatar", req);
