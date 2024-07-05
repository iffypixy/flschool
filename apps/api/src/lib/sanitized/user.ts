import {Prisma} from "@prisma/client";

export const user = (
	user: Prisma.UserGetPayload<{
		include: {
			avatarFile: true;
		};
	}>,
) => ({
	id: user.id,
	firstName: user.firstName,
	lastName: user.lastName,
	avatar: user.avatarFile && user.avatarFile.url,
	role: user.role,
});
