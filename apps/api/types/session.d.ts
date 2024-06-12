import {User} from "@prisma/client";
import "express-session";

import {Maybe} from "@lib/types";

declare module "express-session" {
	interface SessionData {
		user: Maybe<User>;
		userId: Maybe<string>;
	}

	export type SessionWithData = Session & SessionData;
}
