import {CourseType} from "@entities/course";
import {Dto, apiClient} from "@shared/api";

export type GrantCoursePacksToUserDto = Dto<
	{
		userId: string;
		packs: CourseType[];
	},
	void
>;

export const grantCoursePacksToUser = (req: GrantCoursePacksToUserDto["req"]) =>
	apiClient.post<GrantCoursePacksToUserDto["res"]>(
		`/api/internal/admin/users/${req.userId}/courses/packs/grant`,
		req,
	);
