import {Dto, apiClient} from "@shared/api";

export type DeleteExpertDto = Dto<string, void>;

export const deleteExpert = (req: DeleteExpertDto["req"]) =>
	apiClient.delete<DeleteExpertDto["res"]>(
		`/api/internal/admin/experts/${req}`,
	);
