import {forwardRef} from "react";
import * as RXPopover from "@radix-ui/react-popover";
import {cx} from "class-variance-authority";

export const Popover = RXPopover.Root;
export const PopoverTrigger = RXPopover.Trigger;
export const PopoverAnchor = RXPopover.Anchor;

export const PopoverContent = forwardRef<
	React.ElementRef<typeof RXPopover.Content>,
	React.ComponentPropsWithoutRef<typeof RXPopover.Content>
>(({className, align = "center", sideOffset = 4, ...props}, ref) => (
	<RXPopover.Portal>
		<RXPopover.Content
			ref={ref}
			align={align}
			sideOffset={sideOffset}
			className={cx(
				"z-50 w-[28rem] rounded-md border bg-[#fff] p-16 text-[#151515] shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className,
			)}
			{...props}
		/>
	</RXPopover.Portal>
));

PopoverContent.displayName = RXPopover.Content.displayName;
