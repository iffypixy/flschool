import {Dto, apiClient} from "@shared/api";

export type DeleteVacancyDto = Dto<string, void>;

export const deleteVacancy = (req: DeleteVacancyDto["req"]) =>
	apiClient.delete<DeleteVacancyDto["res"]>(
		`/api/internal/admin/vacancies/${req}`,
	);
