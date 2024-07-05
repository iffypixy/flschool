import {createQueryKeys} from "@lukemorales/query-key-factory";

import {GetUserDto} from "../api";

export const userQueryKeys = createQueryKeys("cms/admin/user", {
	"get-all-users": null,
	"get-user": (req: GetUserDto["req"]) => [req],
});
