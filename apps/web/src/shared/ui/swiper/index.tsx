import Slider from "react-slick";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui/icons";

import "slick-carousel/slick/slick.css";

import "./index.css";

const ArrowLeft: React.FC = () => (
	<button className="min-w-60 h-60 rounded-full bg-gradient flex items-center justify-center">
		<Icon.Chevron.Left className="fill-[#fbfbfb] w-12 h-auto" />
	</button>
);

const ArrowRight: React.FC = () => (
	<button className="min-w-60 h-60 rounded-full bg-gradient flex items-center justify-center">
		<Icon.Chevron.Right className="fill-[#fbfbfb] w-12 h-auto" />
	</button>
);

export const Swiper: React.FC<React.ComponentProps<typeof Slider>> = ({
	className,
	...props
}) => (
	<Slider
		className={cx("flex items-center overflow-hidden", className)}
		prevArrow={<ArrowLeft />}
		nextArrow={<ArrowRight />}
		{...props}
	/>
);
