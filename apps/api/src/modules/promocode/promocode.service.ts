import {Injectable} from "@nestjs/common";
import {Promocode} from "@prisma/client";
import {customAlphabet} from "nanoid";

import {PrismaService} from "@lib/prisma";

@Injectable()
export class PromocodeService {
	private readonly CODE_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_-";

	constructor(private readonly prisma: PrismaService) {}

	createPromocode(userId: Promocode["code"]) {
		const code = customAlphabet(this.CODE_CHARSET, 10)();

		return this.prisma.promocode.create({
			data: {
				code,
				userId,
			},
		});
	}
}
