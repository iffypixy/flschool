import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";

import {PrismaService} from "@lib/prisma";

@Injectable()
export class LoadUser implements NestMiddleware {
	constructor(private readonly prisma: PrismaService) {}

	async use(req: Request, _: Response, next: NextFunction) {
		const userId = req.session.userId;

		if (userId) {
			const user = await this.prisma.user.findFirst({
				where: {id: userId},
			});

			if (user) {
				req.session.user = user;
				req.session.userId = user.id;
			}
		}

		next();
	}
}
