import {createQueryKeys} from "@lukemorales/query-key-factory";

import {GetAlumnusDto} from "../api";

export const alumnusQueryKeys = createQueryKeys("alumnus", {
	"get-alumni": null,
	"get-alumnus": (id: GetAlumnusDto["req"]) => [id],
});
