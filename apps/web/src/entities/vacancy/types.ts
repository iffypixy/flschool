export interface Vacancy {
	id: string;
	position: string;
	company: string;
	requiredExperience: RequiredExperience;
	modalityType: ModalityType[];
	employmentType: EmploymentType[];
	createdAt: string;
	salary: number;
	link: string;
}

export enum RequiredExperience {
	NONE = "NONE",
	ONE_TO_THREE_YEARS = "ONE_TO_THREE_YEARS",
	THREE_TO_FIVE_YEARS = "THREE_TO_FIVE_YEARS",
	FIVE_AND_MORE_YEARS = "FIVE_AND_MORE_YEARS",
}

export enum EmploymentType {
	PART_TIME = "PART_TIME",
	FULL_TIME = "FULL_TIME",
	INTERNSHIP = "INTERNSHIP",
}

export enum ModalityType {
	ON_SITE = "ON_SITE",
	REMOTE = "REMOTE",
	HYBRID = "HYBRID",
}
