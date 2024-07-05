import {Alumnus} from "@entities/alumnus";
import {UploadedFile} from "@entities/file";
import {Dto, apiClient} from "@shared/api";

export type GetAlumnusDto = Dto<
	string,
	{
		alumnus: Omit<
			Alumnus,
			"avatar" | "income" | "certificate" | "review"
		> & {
			avatar: UploadedFile;
			income: UploadedFile;
			certificate: UploadedFile;
			review: UploadedFile;
		};
	}
>;

export const getAlumnus = (req: GetAlumnusDto["req"]) =>
	apiClient.get<GetAlumnusDto["res"]>(`/api/internal/admin/alumni/${req}`);
