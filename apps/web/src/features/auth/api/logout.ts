import {Dto, apiClient} from "@shared/api";

export type LogoutDto = Dto<void, void>;

export const logout = () =>
	apiClient.post<LogoutDto["res"]>("/api/auth/local/logout");
