import {forwardRef} from "react";
import * as RXScrollArea from "@radix-ui/react-scroll-area";
import {cx} from "class-variance-authority";

export const ScrollArea = forwardRef<
	React.ElementRef<typeof RXScrollArea.Root>,
	React.ComponentPropsWithoutRef<typeof RXScrollArea.Root>
>(({className, children, ...props}, ref) => (
	<RXScrollArea.Root
		ref={ref}
		className={cx("relative overflow-hidden", className)}
		{...props}
	>
		<RXScrollArea.Viewport className="h-full w-full rounded-[inherit]">
			{children}
		</RXScrollArea.Viewport>

		<ScrollBar />

		<RXScrollArea.Corner />
	</RXScrollArea.Root>
));

ScrollArea.displayName = RXScrollArea.Root.displayName;

export const ScrollBar = forwardRef<
	React.ElementRef<typeof RXScrollArea.ScrollAreaScrollbar>,
	React.ComponentPropsWithoutRef<typeof RXScrollArea.ScrollAreaScrollbar>
>(({className, orientation = "vertical", ...props}, ref) => (
	<RXScrollArea.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cx(
			"flex touch-none select-none transition-colors",
			orientation === "vertical" &&
				"h-full w-10 border-l border-l-transparent p-[1px]",
			orientation === "horizontal" &&
				"h-10 flex-col border-t border-t-transparent p-[1px]",
			className,
		)}
		{...props}
	>
		<RXScrollArea.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
	</RXScrollArea.ScrollAreaScrollbar>
));

ScrollBar.displayName = RXScrollArea.ScrollAreaScrollbar.displayName;
