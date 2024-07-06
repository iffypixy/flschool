import {apiClient, Dto} from "@shared/api";

export type SubmitConsultationRequestDto = Dto<
	{
		name: string;
		phone: string;
	},
	void
>;

export const submitConsultationRequest = (
	req: SubmitConsultationRequestDto["req"],
) =>
	apiClient.post<SubmitConsultationRequestDto["res"]>(
		"/api/consultations",
		req,
	);
