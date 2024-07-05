import {EmploymentType, ModalityType, RequiredExperience} from "../types";

export const modalityTypeToLabel = (key: ModalityType) => {
	const values = {
		ON_SITE: "В офисе",
		REMOTE: "Удаленно",
		HYBRID: "Гибрид",
	} as Record<ModalityType, string>;

	return values[key];
};

export const requiredExperienceToLabel = (key: RequiredExperience) => {
	const values = {
		NONE: "Без опыта",
		ONE_TO_THREE_YEARS: "1-3 года",
		THREE_TO_FIVE_YEARS: "3-5 лет",
		FIVE_AND_MORE_YEARS: "5+ лет",
	} as Record<RequiredExperience, string>;

	return values[key];
};

export const employmentTypeToLabel = (key: EmploymentType) => {
	const values = {
		FULL_TIME: "Фул-тайм",
		PART_TIME: "Парт-тайм",
		INTERNSHIP: "Стажировка",
	} as Record<EmploymentType, string>;

	return values[key];
};
