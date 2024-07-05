import {Expert} from "@entities/expert";
import {Dto, apiClient} from "@shared/api";
import {Nullable} from "@shared/lib/types";

export type EditExpertDto = Dto<
	{
		id: string;
		firstName?: string;
		lastName?: string;
		about?: string;
		avatarFileId?: Nullable<string>;
	},
	{
		expert: Expert;
	}
>;

export const editExpert = (req: EditExpertDto["req"]) =>
	apiClient.put<EditExpertDto["res"]>(
		`/api/internal/admin/experts/${req.id}`,
		req,
	);
