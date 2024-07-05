import {Vacancy} from "@entities/vacancy";
import {Dto, apiClient} from "@shared/api";

export type GetVacancyDto = Dto<
	string,
	{
		vacancy: Vacancy;
	}
>;

export const getVacancy = (req: GetVacancyDto["req"]) =>
	apiClient.get<GetVacancyDto["res"]>(`/api/internal/admin/vacancies/${req}`);
