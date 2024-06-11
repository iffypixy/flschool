import {forwardRef} from "react";
import {cx} from "class-variance-authority";

export const Input = forwardRef<
	React.ElementRef<"input">,
	React.ComponentPropsWithoutRef<"input">
>(({className, ...props}, ref) => (
	<input
		ref={ref}
		className={cx(
			"py-14 px-24 rounded-12 bg-transparent placeholder:text-[rgba(255,255,255,0.6)] font-manrope text-[#fbfbfb] border border-[#fbfbfb] font-medium text-18 outline-none",
			className,
		)}
		{...props}
	/>
));
