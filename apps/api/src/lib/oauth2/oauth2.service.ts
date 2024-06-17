import {Injectable} from "@nestjs/common";

import {OAuth2Google} from "./providers";

@Injectable()
export class OAuth2Service {
	constructor(public readonly google: OAuth2Google) {}
}
