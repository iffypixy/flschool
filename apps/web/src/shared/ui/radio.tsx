import {forwardRef} from "react";
import * as RXGroup from "@radix-ui/react-radio-group";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui";

export const RadioGroup = forwardRef<
	React.ElementRef<typeof RXGroup.Root>,
	React.ComponentPropsWithoutRef<typeof RXGroup.Root>
>(({className, ...props}, ref) => {
	return (
		<RXGroup.Root
			className={cx("grid gap-8", className)}
			{...props}
			ref={ref}
		/>
	);
});

RadioGroup.displayName = RXGroup.Root.displayName;

export const RadioGroupItem = forwardRef<
	React.ElementRef<typeof RXGroup.Item>,
	React.ComponentPropsWithoutRef<typeof RXGroup.Item>
>(({className, ...props}, ref) => {
	return (
		<RXGroup.Item
			ref={ref}
			className={cx(
				"aspect-square h-20 w-20 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<RXGroup.Indicator className="flex items-center justify-center">
				<Icon.Check className="h-10 w-10 fill-primary" />
			</RXGroup.Indicator>
		</RXGroup.Item>
	);
});

RadioGroupItem.displayName = RXGroup.Item.displayName;
