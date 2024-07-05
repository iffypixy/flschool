import {User} from "@entities/user";
import {Dto, apiClient} from "@shared/api";

export type GetAllUsersDto = Dto<
	void,
	{
		users: Array<
			User & {
				promocode: {
					own: string;
					referral: string;
				};
			}
		>;
	}
>;

export const getAllUsers = () =>
	apiClient.get<GetAllUsersDto["res"]>("/api/internal/admin/users");
