import {Vacancy} from "@entities/vacancy";
import {Dto, apiClient} from "@shared/api";

export type GetAllVacanciesDto = Dto<
	void,
	{
		vacancies: Vacancy[];
	}
>;

export const getAllVacancies = () =>
	apiClient.get<GetAllVacanciesDto["res"]>("/api/internal/admin/vacancies");
