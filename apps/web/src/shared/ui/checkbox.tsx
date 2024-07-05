import {forwardRef} from "react";
import * as RXCheckbox from "@radix-ui/react-checkbox";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui";

export const Checkbox = forwardRef<
	React.ElementRef<typeof RXCheckbox.Root>,
	React.ComponentPropsWithoutRef<typeof RXCheckbox.Root>
>(({className, ...props}, ref) => (
	<RXCheckbox.Root
		ref={ref}
		className={cx(
			"peer h-16 w-16 xs:h-20 xs:w-20 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
			className,
		)}
		{...props}
	>
		<RXCheckbox.Indicator
			className={cx("flex items-center justify-center")}
		>
			<Icon.Check className="h-10 w-10 xs:h-14 xs:w-14 fill-primary" />
		</RXCheckbox.Indicator>
	</RXCheckbox.Root>
));

Checkbox.displayName = RXCheckbox.Root.displayName;
