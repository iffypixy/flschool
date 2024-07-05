import {Prisma} from "@prisma/client";

export const credentials = (
	user: Prisma.UserGetPayload<{
		include: {
			avatarFile: true;
		};
	}>,
) => ({
	id: user.id,
	firstName: user.firstName,
	lastName: user.lastName,
	email: user.email,
	avatar: user.avatarFile?.url,
	role: user.role,
});
