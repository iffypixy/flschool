import {useViewer} from "@entities/viewer";

import {routeRole} from "@app/router/route";

import {PrivateHomePage} from "./private";
import {GuestHomePage} from "./guest";
import {AdminHomePage} from "./admin";
import {ExpertHomePage} from "./expert";

export const HomePage: React.FC = () => {
	const {viewer} = useViewer();

	const role = routeRole(viewer);

	const isAdmin = role === "ADMIN";
	const isExpert = role === "EXPERT";
	const isUser = role === "USER";
	const isGuest = role === "GUEST";

	if (isAdmin) return <AdminHomePage />;
	if (isExpert) return <ExpertHomePage />;
	if (isUser) return <PrivateHomePage />;
	if (isGuest) return <GuestHomePage />;

	return null;
};
