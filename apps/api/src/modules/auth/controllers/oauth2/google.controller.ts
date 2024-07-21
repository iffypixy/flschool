import {Controller, Get, Query, Res, Session} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SessionWithData} from "express-session";
import {Response} from "express";

import {PromocodeService} from "@modules/promocode";
import {OAuth2Service} from "@lib/oauth2";
import {PrismaService} from "@lib/prisma";

import * as dtos from "@modules/auth/dtos";

@Controller("auth/oauth2/google")
export class AuthOAuth2GoogleController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly oauth2: OAuth2Service,
        private readonly promocodeService: PromocodeService,
    ) {}

    @Get("/")
    redirectToAuthorization(@Res() res: Response) {
        res.redirect(this.oauth2.google.authorizationUrl);
    }

    @Get("redirect")
    async handleRedirect(
        @Session() session: SessionWithData,
        @Query() dto: dtos.OAuth2RedirectQuery,
        @Res() res: Response,
    ) {
        const credentials = await this.oauth2.google.loadCredentials(dto.code);

        const provider = await this.prisma.userAuthProvider.findFirst({
            where: {
                uid: credentials.id,
                name: "GOOGLE",
            },
            include: {
                user: {
                    include: {
                        avatarFile: true,
                    },
                },
            },
        });

        const hasAccount = !!provider;

        if (hasAccount) {
            session.user = provider.user;
            session.userId = provider.userId;
        } else {
            const user = await this.prisma.user.create({
                data: {
                    email: credentials.email,
                    firstName: credentials.given_name,
                    lastName: credentials.family_name,
                },
                include: {
                    avatarFile: true,
                },
            });

            await this.prisma.userAuthProvider.create({
                data: {
                    name: "GOOGLE",
                    uid: credentials.id,
                    userId: user.id,
                },
            });

            await this.promocodeService.createPromocode(user.id);

            session.user = user;
            session.userId = user.id;
        }

        return res.redirect(this.config.get("client.origin"));
    }
}
