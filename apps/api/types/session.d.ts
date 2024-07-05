import {Prisma} from "@prisma/client";
import "express-session";

import {Maybe} from "@lib/types";

declare module "express-session" {
	interface SessionData {
		user: Maybe<
			Prisma.UserGetPayload<{
				include: {
					avatarFile: true;
				};
			}>
		>;
		userId: Maybe<string>;
	}

	export type SessionWithData = Session & SessionData;
}
