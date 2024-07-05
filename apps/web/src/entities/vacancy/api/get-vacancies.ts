import {Dto, apiClient} from "@shared/api";

import {Vacancy} from "../types";

export type GetVacanciesDto = Dto<
	void,
	{
		vacancies: Vacancy[];
	}
>;

export const getVacancies = () =>
	apiClient.get<GetVacanciesDto["res"]>("/api/vacancies");
