import {Dto, apiClient} from "@shared/api";

export type VerifyEmailDto = Dto<
	{
		email: string;
	},
	{
		isAvailable: boolean;
	}
>;

export const verifyEmail = (req: VerifyEmailDto["req"]) =>
	apiClient.get<VerifyEmailDto["res"]>("/api/auth/local/verify/email", {
		params: req,
	});
