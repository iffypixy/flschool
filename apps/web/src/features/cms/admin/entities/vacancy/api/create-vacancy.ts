import {
	EmploymentType,
	ModalityType,
	RequiredExperience,
	Vacancy,
} from "@entities/vacancy";
import {Dto, apiClient} from "@shared/api";

export type CreateVacancyDto = Dto<
	{
		position: string;
		company: string;
		requiredExperience: RequiredExperience;
		modalityType: ModalityType[];
		employmentType: EmploymentType[];
		salary: number;
		link: string;
	},
	{
		vacancy: Vacancy;
	}
>;

export const createVacancy = (req: CreateVacancyDto["req"]) =>
	apiClient.post<CreateVacancyDto["res"]>(
		"/api/internal/admin/vacancies",
		req,
	);
