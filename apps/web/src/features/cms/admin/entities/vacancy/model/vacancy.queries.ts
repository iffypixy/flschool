import {createQueryKeys} from "@lukemorales/query-key-factory";

import {GetVacancyDto} from "../api";

export const vacancyQueryKeys = createQueryKeys("cms/admin/vacancy", {
	"get-all-vacancies": null,
	"get-vacancy": (req: GetVacancyDto["req"]) => [req],
});
