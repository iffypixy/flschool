import axios from "axios";

interface TokensPayload {
	id_token: string;
	access_token: string;
}

interface OAuth2Options<T> {
	redirect_uri: string;
	client_id: string;
	client_secret: string;
	scope: string;
	authorization: string;
	token: string;
	loadCredentials: (options: TokensPayload) => Promise<T>;
}

export class OAuth2Provider<T> {
	constructor(public readonly options: OAuth2Options<T>) {}

	get authorizationUrl() {
		const params = new URLSearchParams({
			access_type: "offline",
			response_type: "code",
			prompt: "consent",
			redirect_uri: this.options.redirect_uri,
			client_id: this.options.client_id,
			scope: this.options.scope,
		});

		return `${this.options.authorization}?${params}`;
	}

	async loadCredentials(code: string) {
		const params = new URLSearchParams({
			code,
			redirect_uri: this.options.redirect_uri,
			client_id: this.options.client_id,
			client_secret: this.options.client_secret,
			grant_type: "authorization_code",
		});

		const res = await axios.post<TokensPayload>(this.options.token, null, {
			params,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		return this.options.loadCredentials(res.data);
	}
}
