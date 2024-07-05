import {CourseType} from "../types";

export const courseTypeToLabel = (key: CourseType) => {
	const values: Record<CourseType, string> = {
		FL_TEENS: "Freelance teens",
		EDUCATION: "Образование",
		LANGUAGE: "Язык",
	};

	return values[key];
};
