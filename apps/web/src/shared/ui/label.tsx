import {forwardRef} from "react";
import * as RXLabel from "@radix-ui/react-label";
import {cx} from "class-variance-authority";

export const Label = forwardRef<
	React.ElementRef<typeof RXLabel.Root>,
	React.ComponentPropsWithoutRef<typeof RXLabel.Root>
>(({className, ...props}, ref) => (
	<RXLabel.Root
		ref={ref}
		className={cx(
			"text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
			className,
		)}
		{...props}
	/>
));

Label.displayName = RXLabel.Root.displayName;
