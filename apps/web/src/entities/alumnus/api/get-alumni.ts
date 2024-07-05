import {Dto, apiClient} from "@shared/api";

import {Alumnus} from "../types";

export type GetAlumniDto = Dto<
	void,
	{
		alumni: {
			id: Alumnus["id"];
			avatar: Alumnus["avatar"];
			firstName: Alumnus["firstName"];
			lastName: Alumnus["lastName"];
			workplace: Alumnus["workplace"];
			course: Alumnus["course"];
		}[];
	}
>;

export const getAlumni = () =>
	apiClient.get<GetAlumniDto["res"]>("/api/alumni");
