import {Redirect} from "wouter";

import {ROUTER_PATHS} from "@app/router/paths";

export const InternalAdminHomePage: React.FC = () => {
    return <Redirect to={ROUTER_PATHS.INTERNAL.ADMIN.USERS} />;
};
