import {Alumnus} from "@entities/alumnus";
import {Dto, apiClient} from "@shared/api";
import {Nullable} from "@shared/lib/types";

export type CreateAlumnusDto = Dto<
	{
		avatarFileId?: Nullable<string>;
		firstName: string;
		lastName: string;
		workplace: string;
		about: string;
		courseId: string;
		incomeFileId: Nullable<string>;
		certificateFileId: Nullable<string>;
		reviewFileId: Nullable<string>;
	},
	{
		alumnus: Alumnus;
	}
>;

export const createAlumnus = (req: CreateAlumnusDto["req"]) =>
	apiClient.post<CreateAlumnusDto["res"]>("/api/internal/admin/alumni", req);
