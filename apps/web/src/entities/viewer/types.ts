import {Nullable} from "@shared/lib/types";

export interface Viewer {
	id: string;
	firstName: string;
	lastName: string;
	avatar: Nullable<string>;
	email: string;
	role: ViewerRole;
}

export type ViewerRole = "ADMIN" | "EXPERT" | "USER";
