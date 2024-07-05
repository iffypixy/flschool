import {forwardRef} from "react";
import * as RXProgress from "@radix-ui/react-progress";
import {cx} from "class-variance-authority";

export const Progress = forwardRef<
	React.ElementRef<typeof RXProgress.Root>,
	React.ComponentPropsWithoutRef<typeof RXProgress.Root>
>(({className, value, ...props}, ref) => (
	<RXProgress.Root
		ref={ref}
		className={cx(
			"relative h-10 w-full overflow-hidden rounded-full bg-primary/30",
			className,
		)}
		{...props}
	>
		<RXProgress.Indicator
			className="h-full w-full flex-1 bg-primary transition-all"
			style={{transform: `translateX(-${100 - (value || 0)}%)`}}
		/>
	</RXProgress.Root>
));

Progress.displayName = RXProgress.Root.displayName;
