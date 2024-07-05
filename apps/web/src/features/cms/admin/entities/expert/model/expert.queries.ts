import {createQueryKeys} from "@lukemorales/query-key-factory";
import {GetExpertDto} from "../api";
import {SearchExpertsDto} from "../api/search-experts";

export const expertQueryKeys = createQueryKeys("cms/admin/expert", {
	"get-all-experts": null,
	"get-expert": (req: GetExpertDto["req"]) => [req],
	"get-expert-metrics": null,
	"search-experts": (req: SearchExpertsDto["req"]) => [req.query],
});
