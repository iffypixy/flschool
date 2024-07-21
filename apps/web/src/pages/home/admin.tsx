import {Redirect} from "wouter";

import {ROUTER_PATHS} from "@app/router/paths";

export const AdminHomePage: React.FC = () => (
    <Redirect to={ROUTER_PATHS.INTERNAL.ADMIN.USERS} />
);
