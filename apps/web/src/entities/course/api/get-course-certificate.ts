import {Dto, apiClient} from "@shared/api";

export type GetCourseCertificateDto = Dto<
	string,
	{
		isReviewed: boolean;
		certificate?: string;
	}
>;

export const getCourseCertificate = (req: GetCourseCertificateDto["req"]) =>
	apiClient.get<GetCourseCertificateDto["res"]>(
		`/api/courses/${req}/certificate`,
	);
