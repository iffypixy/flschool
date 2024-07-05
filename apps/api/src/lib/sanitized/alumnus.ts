import {Prisma} from "@prisma/client";

import {sanitized} from "@lib/sanitized";

export const alumnus = (
	alumnus: Prisma.AlumnusGetPayload<{
		include: {
			avatarFile: true;
			incomeFile: true;
			reviewFile: true;
			certificateFile: true;
			course: {
				include: {
					previewFile: true;
				};
			};
		};
	}>,
) => ({
	id: alumnus.id,
	firstName: alumnus.firstName,
	lastName: alumnus.lastName,
	about: alumnus.about,
	workplace: alumnus.workplace,
	avatar: alumnus.avatarFile && alumnus.avatarFile.url,
	course: alumnus.course && sanitized.course(alumnus.course),
	income: sanitized.file(alumnus.incomeFile),
	review: sanitized.file(alumnus.reviewFile),
	certificate: sanitized.file(alumnus.certificateFile),
});
