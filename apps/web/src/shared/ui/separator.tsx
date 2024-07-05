import {forwardRef} from "react";
import * as RXSeparator from "@radix-ui/react-separator";
import {cx} from "class-variance-authority";

export const Separator = forwardRef<
	React.ElementRef<typeof RXSeparator.Root>,
	React.ComponentPropsWithoutRef<typeof RXSeparator.Root>
>(
	(
		{className, orientation = "horizontal", decorative = true, ...props},
		ref,
	) => (
		<RXSeparator.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cx(
				"shrink-0 bg-[#dadada]",
				orientation === "horizontal"
					? "h-[1px] w-full"
					: "h-full w-[1px]",
				className,
			)}
			{...props}
		/>
	),
);

Separator.displayName = RXSeparator.Root.displayName;
