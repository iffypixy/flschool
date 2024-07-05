import {Dto, apiClient} from "@shared/api";

export type GetMyPromocodeDto = Dto<
	void,
	{
		promocode: string;
	}
>;

export const getMyPromocode = () =>
	apiClient.get<GetMyPromocodeDto["res"]>("/api/profile/me/promocode");
