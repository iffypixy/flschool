import {Expert} from "@entities/expert";
import {Dto, apiClient} from "@shared/api";
import {Nullable} from "@shared/lib/types";

export type CreateExpertDto = Dto<
	{
		firstName: string;
		lastName: string;
		about: string;
		avatarFileId?: Nullable<string>;
		email: string;
	},
	{
		expert: Expert;
	}
>;

export const createExpert = (req: CreateExpertDto["req"]) =>
	apiClient.post<CreateExpertDto["res"]>("/api/internal/admin/experts", req);
