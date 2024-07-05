import {createQueryKeys} from "@lukemorales/query-key-factory";

export const expertQueryKeys = createQueryKeys("expert", {
	"get-experts": null,
	"get-expert": (id: string) => [id],
});
