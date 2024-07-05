import {Course} from "@entities/course";
import {Nullable} from "@shared/lib/types";

export interface Alumnus {
	id: string;
	firstName: string;
	lastName: string;
	workplace: string;
	avatar: Nullable<string>;
	about: string;
	course: Course;
	income: string;
	certificate: string;
	review: string;
}
