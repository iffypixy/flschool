import {IsString} from "class-validator";

export class OAuth2RedirectQuery {
	@IsString()
	code: string;
}
