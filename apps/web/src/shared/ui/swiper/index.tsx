import Slider, {CustomArrowProps} from "react-slick";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";

interface ArrowProps extends CustomArrowProps, React.ComponentProps<"button"> {
	onClick?: () => void;
}

const ArrowLeft: React.FC<ArrowProps> = ({
	currentSlide,
	slideCount,
	className,
	...props
}) => (
	<button
		aria-disabled={currentSlide === 0 ? true : false}
		className="min-w-60 h-60 rounded-full bg-gradient !flex items-center justify-center"
		{...props}
	>
		<Icon.Chevron.Left className="fill-[#fbfbfb] w-12 h-auto" />
	</button>
);

const ArrowRight: React.FC<ArrowProps> = ({
	currentSlide,
	slideCount,
	className,
	...props
}) => (
	<button
		aria-disabled={currentSlide === slideCount! - 1 ? true : false}
		className="min-w-60 h-60 rounded-full bg-gradient !flex items-center justify-center"
		{...props}
	>
		<Icon.Chevron.Right className="fill-[#fbfbfb] w-12 h-auto" />
	</button>
);

interface SwiperProps extends React.ComponentProps<typeof Slider> {
	showArrows?: boolean;
}

export const Swiper: React.FC<SwiperProps> = ({
	className,
	showArrows,
	...props
}) => (
	<Slider
		{...props}
		className={cx("flex items-center", className)}
		prevArrow={showArrows ? <ArrowLeft /> : undefined}
		nextArrow={showArrows ? <ArrowRight /> : undefined}
	/>
);
