import {createQueryKeys} from "@lukemorales/query-key-factory";

import {VerifyEmailDto} from "../api";

export const authQueryKeys = createQueryKeys("auth", {
	logout: null,
	"sign-up": null,
	"sign-in": null,
	"verify-email": (req: VerifyEmailDto["req"]) => [req.email],
});
