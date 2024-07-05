import {Viewer} from "@entities/viewer";
import {Dto, apiClient} from "@shared/api";

export type SignUpDto = Dto<
	{
		firstName: string;
		lastName: string;
		email: string;
		password: string;
		promocode?: string;
	},
	{
		credentials: Viewer;
	}
>;

export const signUp = (req: SignUpDto["req"]) =>
	apiClient.post<SignUpDto["res"]>("/api/auth/local/register", req);
