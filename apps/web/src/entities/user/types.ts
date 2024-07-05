import {Nullable} from "@shared/lib/types";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	avatar: Nullable<string>;
	email: string;
}
