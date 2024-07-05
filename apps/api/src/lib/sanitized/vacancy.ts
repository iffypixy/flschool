import {Vacancy} from "@prisma/client";

export const vacancy = (vacancy: Vacancy) => ({
	...vacancy,
	updatedAt: undefined,
});
