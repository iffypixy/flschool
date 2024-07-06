import {createQueryKeys} from "@lukemorales/query-key-factory";

import {queryClient} from "@app/query-client";

import {GetUserDto} from "../api";

export const userQueryKeys = createQueryKeys("cms/admin/user", {
	"get-all-users": null,
	"get-user": (req: GetUserDto["req"]) => [req],
});

export const invalidateUserQueries = () =>
	queryClient.invalidateQueries({
		queryKey: userQueryKeys._def,
	});
