import {Dto, apiClient} from "@shared/api";

import {UploadedFile} from "@entities/file";

import {Alumnus} from "../types";

export type GetAlumnusDto = Dto<
	string,
	{
		alumnus: Omit<Alumnus, "income" | "certificate" | "review"> & {
			income: UploadedFile;
			certificate: UploadedFile;
			review: UploadedFile;
		};
	}
>;

export const getAlumnus = (req: GetAlumnusDto["req"]) =>
	apiClient.get<GetAlumnusDto["res"]>(`/api/alumni/${req}`);
