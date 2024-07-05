import {cx} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

import logo from "@shared/assets/logo.png";
import {PropsWithClassName} from "@shared/lib/types";

export const Logo: React.FC<PropsWithClassName> = ({className}) => (
	<img
		src={logo}
		alt="Логотип фриланс школы"
		className={twMerge(cx("size-76 rounded-full bg-[#f8f8f8]", className))}
	/>
);
