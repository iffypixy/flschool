import {cx} from "class-variance-authority";

import logo from "@shared/assets/logo.png";
import {PropsWithClassName} from "@shared/lib/types";

export const Logo: React.FC<PropsWithClassName> = ({className}) => (
	<img
		src={logo}
		alt="Логотип фриланс школы"
		className={cx("w-[7.5rem] h-[7.5rem] rounded-full", className)}
	/>
);
