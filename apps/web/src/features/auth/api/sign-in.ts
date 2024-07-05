import {Viewer} from "@entities/viewer";
import {Dto, apiClient} from "@shared/api";

export type SignInDto = Dto<
	{
		email: string;
		password: string;
	},
	{
		credentials: Viewer;
	}
>;

export const signIn = (req: SignInDto["req"]) =>
	apiClient.post<SignInDto["res"]>("/api/auth/local/login", req);
