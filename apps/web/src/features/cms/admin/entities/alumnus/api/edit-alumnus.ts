import {Alumnus} from "@entities/alumnus";
import {Dto, apiClient} from "@shared/api";
import {Nullable} from "@shared/lib/types";

export type EditAlumnusDto = Dto<
	{
		id: string;
		avatarFileId?: Nullable<string>;
		firstName?: string;
		lastName?: string;
		workplace?: string;
		about?: string;
		courseId?: string;
		incomeFileId?: Nullable<string>;
		certificateFileId?: Nullable<string>;
		reviewFileId?: Nullable<string>;
	},
	{
		alumnus: Alumnus;
	}
>;

export const editAlumnus = (req: EditAlumnusDto["req"]) =>
	apiClient.put<EditAlumnusDto["res"]>(
		`/api/internal/admin/alumni/${req.id}`,
		req,
	);
