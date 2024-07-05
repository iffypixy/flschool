import {Language} from "@entities/language";

export interface Course {
	id: string;
	name: string;
	hook: string;
	description: string;
	audience: string[];
	duration: number;
	price?: number;
	type: CourseType;
	language: Language;
}

export enum CourseType {
	FL_TEENS = "FL_TEENS",
	EDUCATION = "EDUCATION",
	LANGUAGE = "LANGUAGE",
}
