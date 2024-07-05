import {Prisma} from "@prisma/client";

export const expert = (
	expert: Prisma.ExpertGetPayload<{
		include: {
			user: {
				include: {
					avatarFile: true;
				};
			};
		};
	}>,
) => ({
	id: expert.id,
	firstName: expert.user.firstName,
	lastName: expert.user.lastName,
	email: expert.user.email,
	avatar: expert.user.avatarFile && expert.user.avatarFile.url,
	role: expert.user.role,
	about: expert.about,
});
