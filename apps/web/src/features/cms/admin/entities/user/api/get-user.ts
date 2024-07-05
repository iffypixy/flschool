import {CourseType} from "@entities/course";
import {User} from "@entities/user";
import {Dto, apiClient} from "@shared/api";

export type GetUserDto = Dto<
	string,
	{
		user: User & {
			courses: {
				packs: CourseType[];
				ids: string[];
			};
		};
	}
>;

export const getUser = (req: GetUserDto["req"]) =>
	apiClient.get<GetUserDto["res"]>(`/api/internal/admin/users/${req}`);
