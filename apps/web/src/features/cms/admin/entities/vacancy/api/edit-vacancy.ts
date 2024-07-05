import {
	EmploymentType,
	ModalityType,
	RequiredExperience,
	Vacancy,
} from "@entities/vacancy";
import {Dto, apiClient} from "@shared/api";

export type EditVacancyDto = Dto<
	{
		id: string;
		position?: string;
		company?: string;
		requiredExperience?: RequiredExperience;
		modalityType?: ModalityType[];
		employmentType?: EmploymentType[];
		salary?: number;
		link?: string;
	},
	{
		vacancy: Vacancy;
	}
>;

export const editVacancy = (req: EditVacancyDto["req"]) =>
	apiClient.put<EditVacancyDto["res"]>(
		`/api/internal/admin/vacancies/${req.id}`,
		req,
	);
