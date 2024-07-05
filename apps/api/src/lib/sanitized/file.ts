import {File} from "@prisma/client";

export const file = (file: File) => ({
	id: file.id,
	name: file.name,
	url: file.url,
});
