import {ConsultationRequest} from "@entities/consultation-request";
import {Dto, apiClient} from "@shared/api";

export type GetAllConsultationRequestsDto = Dto<
	void,
	{
		consultationRequests: ConsultationRequest[];
	}
>;

export const getAllConsultationRequests = () =>
	apiClient.get<GetAllConsultationRequestsDto["res"]>(
		"/api/internal/admin/consultation-requests",
	);
