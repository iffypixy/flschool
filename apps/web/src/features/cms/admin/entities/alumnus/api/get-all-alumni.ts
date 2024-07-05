import {Alumnus} from "@entities/alumnus";
import {Dto, apiClient} from "@shared/api";

export type GetAllAlumniDto = Dto<
	void,
	{
		alumni: Alumnus[];
	}
>;

export const getAllAlumni = () =>
	apiClient.get<GetAllAlumniDto["res"]>("/api/internal/admin/alumni");
