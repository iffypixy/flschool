import {Expert} from "@entities/expert";
import {UploadedFile} from "@entities/file";
import {Dto, apiClient} from "@shared/api";
import {Nullable} from "@shared/lib/types";

export type GetExpertDto = Dto<
	string,
	{
		expert: Expert & {
			avatar: Nullable<UploadedFile>;
			plainPassword: string;
		};
	}
>;

export const getExpert = (req: GetExpertDto["req"]) =>
	apiClient.get<GetExpertDto["res"]>(`/api/internal/admin/experts/${req}`);
