import {Dto, apiClient} from "@shared/api";

export type GrantCoursesToUserDto = Dto<
	{
		userId: string;
		courseIds: string[];
	},
	void
>;

export const grantCoursesToUser = (req: GrantCoursesToUserDto["req"]) =>
	apiClient.post<GrantCoursesToUserDto["res"]>(
		`/api/internal/admin/users/${req.userId}/courses/grant`,
		req,
	);
