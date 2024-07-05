import {createQueryKeys} from "@lukemorales/query-key-factory";

import {GetAlumnusDto} from "../api";

export const alumnusQueryKeys = createQueryKeys("cms/admin/alumni", {
	"get-all-alumni": null,
	"get-alumnus": (req: GetAlumnusDto["req"]) => [req],
});
