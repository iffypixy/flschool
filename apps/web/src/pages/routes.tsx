import {Switch, Route} from "wouter";

import {HomePage} from "./home";

export const Routes: React.FC = () => (
	<Switch>
		<Route path="/" component={HomePage} />
	</Switch>
);
