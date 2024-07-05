import {forwardRef} from "react";
import * as RXSheet from "@radix-ui/react-dialog";
import {cx, cva, type VariantProps} from "class-variance-authority";

import {Icon} from "@shared/ui";

export const Sheet = RXSheet.Root;
export const SheetTrigger = RXSheet.Trigger;
export const SheetClose = RXSheet.Close;
export const SheetPortal = RXSheet.Portal;

export const SheetOverlay = forwardRef<
	React.ElementRef<typeof RXSheet.Overlay>,
	React.ComponentPropsWithoutRef<typeof RXSheet.Overlay>
>(({className, ...props}, ref) => (
	<RXSheet.Overlay
		className={cx(
			"fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
		ref={ref}
	/>
));

SheetOverlay.displayName = RXSheet.Overlay.displayName;

const sheetVariants = cva(
	"fixed z-50 gap-16 bg-[#fff] p-24 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
				bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
				right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
			},
		},
		defaultVariants: {
			side: "right",
		},
	},
);

interface SheetContentProps
	extends React.ComponentPropsWithoutRef<typeof RXSheet.Content>,
		VariantProps<typeof sheetVariants> {}

export const SheetContent = forwardRef<
	React.ElementRef<typeof RXSheet.Content>,
	SheetContentProps
>(({className, children, side = "right", ...props}, ref) => (
	<SheetPortal>
		<SheetOverlay />
		<RXSheet.Content
			ref={ref}
			className={cx(sheetVariants({side}), className)}
			{...props}
		>
			{children}
			<RXSheet.Close className="absolute right-16 top-16 rounded-sm opacity-70 ring-offset-[#fbfbfb] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[#fff]">
				<Icon.Cross className="h-16 w-16" />

				<span className="sr-only">Close</span>
			</RXSheet.Close>
		</RXSheet.Content>
	</SheetPortal>
));

SheetContent.displayName = RXSheet.Content.displayName;

export const SheetHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cx(
			"flex flex-col space-y-8 text-center sm:text-left",
			className,
		)}
		{...props}
	/>
);

SheetHeader.displayName = "SheetHeader";

export const SheetFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cx(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-8",
			className,
		)}
		{...props}
	/>
);

SheetFooter.displayName = "SheetFooter";

export const SheetTitle = forwardRef<
	React.ElementRef<typeof RXSheet.Title>,
	React.ComponentPropsWithoutRef<typeof RXSheet.Title>
>(({className, ...props}, ref) => (
	<RXSheet.Title
		ref={ref}
		className={cx("text-lg font-semibold text-[#151515]", className)}
		{...props}
	/>
));

SheetTitle.displayName = RXSheet.Title.displayName;

export const SheetDescription = forwardRef<
	React.ElementRef<typeof RXSheet.Description>,
	React.ComponentPropsWithoutRef<typeof RXSheet.Description>
>(({className, ...props}, ref) => (
	<RXSheet.Description
		ref={ref}
		className={cx("text-sm text-[#434343]", className)}
		{...props}
	/>
));

SheetDescription.displayName = RXSheet.Description.displayName;
