import {Switch, Route} from "wouter";

import {HomePage} from "./home";
import {CoursesPage} from "./courses";

export const Routes: React.FC = () => (
	<Switch>
		<Route path="/" component={HomePage} />
		<Route path="/courses" component={CoursesPage} />
	</Switch>
);
