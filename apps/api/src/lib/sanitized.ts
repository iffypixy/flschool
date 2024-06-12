import {User} from "@prisma/client";

const credentials = (user: User) => ({
	id: user.id,
	firstName: user.firstName,
	lastName: user.lastName,
	email: user.email,
});

export const sanitized = {credentials};
