import {Dto, apiClient} from "@shared/api";

export type DeleteAlumnusDto = Dto<string, void>;

export const deleteAlumnus = (req: DeleteAlumnusDto["req"]) =>
	apiClient.delete<DeleteAlumnusDto["res"]>(
		`/api/internal/admin/alumni/${req}`,
	);
