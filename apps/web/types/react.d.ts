import React from "react";

declare module "react" {
	/** @note WC = with children */
	type FCWC = React.FC<{children: React.ReactNode}>;
}
