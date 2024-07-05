import {cx} from "class-variance-authority";

import "./index.css";

export const Spinner: React.FC<React.ComponentProps<"div">> = ({
	className,
	...props
}) => <div className={cx("spinner border-primary", className)} {...props} />;
