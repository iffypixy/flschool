import {Redirect, Route, RouteProps} from "wouter";

import {Viewer, ViewerRole, useViewer} from "@entities/viewer";
import {Nullable} from "@shared/lib/types";

import {ROUTER_PATHS} from "./paths";

type RouteRole = ViewerRole | "GUEST";

export const routeRole = (viewer?: Nullable<Viewer>): RouteRole =>
    viewer ? viewer.role : "GUEST";

interface RoleRouteProps extends RouteProps {
    roles: Array<RouteRole>;
}

export const RoleRoute: React.FC<RoleRouteProps> = ({roles, ...props}) => {
    const {viewer} = useViewer();

    const role: RouteRole = viewer?.role || "GUEST";

    if (roles.includes(role)) return <Route {...props} />;
    else return <Redirect to={ROUTER_PATHS.HOME} />;
};

export const PublicOnlyRoute: React.FC<RouteProps> = (props) => (
    <RoleRoute {...props} roles={["GUEST"]} />
);

export const PublicRoute: React.FC<RouteProps> = (props) => (
    <RoleRoute {...props} roles={["GUEST", "USER", "EXPERT", "ADMIN"]} />
);

export const PrivateRoute: React.FC<RouteProps> = (props) => (
    <RoleRoute {...props} roles={["USER", "EXPERT", "ADMIN"]} />
);

export const InternalAdminRoute: React.FC<RouteProps> = (props) => (
    <RoleRoute {...props} roles={["ADMIN"]} />
);

export const InternalExpertRoute: React.FC<RouteProps> = (props) => (
    <RoleRoute {...props} roles={["EXPERT"]} />
);

export const AuthenticatedRoute: React.FC<RouteProps> = (props) => (
    <RoleRoute {...props} roles={["USER", "EXPERT", "ADMIN"]} />
);
