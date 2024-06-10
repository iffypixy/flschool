import {forwardRef} from "react";
import {cx} from "class-variance-authority";

export const Input = forwardRef<
	React.ElementRef<"input">,
	React.ComponentPropsWithoutRef<"input">
>(({className, ...props}, ref) => (
	<input
		ref={ref}
		className={cx(
			"py-14 px-24 rounded-12 bg-transparent placeholder:text-white/60 font-manrope text-white border border-white font-medium text-[1.8rem] outline-none",
			className,
		)}
		{...props}
	/>
));
