import axios from "axios";

import {BACKEND_URL} from "@shared/config";

export const apiClient = axios.create({
	baseURL: BACKEND_URL,
	withCredentials: true,
});

export interface Dto<TReq = unknown, TRes = unknown> {
	req: TReq;
	res: TRes;
}
