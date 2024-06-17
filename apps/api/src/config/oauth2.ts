import {registerAs} from "@nestjs/config";

export const oauth2 = registerAs("oauth2", () => ({
	google: {
		client: {
			id: process.env.GOOGLE_CLIENT_ID,
			secret: process.env.GOOGLE_CLIENT_SECRET,
		},
		redirectUri: process.env.GOOGLE_REDIRECT_URI,
		credentialsUri: process.env.GOOGLE_CREDENTIALS_URI,
		authorizationUri: process.env.GOOGLE_AUTHORIZATION_URI,
		token: process.env.GOOGLE_TOKEN,
		scope: process.env.GOOGLE_SCOPE,
	},
}));
