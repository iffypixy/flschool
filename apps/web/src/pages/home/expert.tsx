import {Redirect} from "wouter";

import {ROUTER_PATHS} from "@app/router/paths";

export const ExpertHomePage: React.FC = () => (
	<Redirect to={ROUTER_PATHS.INTERNAL.EXPERT.COURSES} />
);
