import {forwardRef} from "react";
import * as RXSelect from "@radix-ui/react-select";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui";

export const Select = RXSelect.Root;
export const SelectGroup = RXSelect.Group;
export const SelectValue = RXSelect.Value;

export const SelectTrigger = forwardRef<
	React.ElementRef<typeof RXSelect.Trigger>,
	React.ComponentPropsWithoutRef<typeof RXSelect.Trigger>
>(({className, children, ...props}, ref) => (
	<RXSelect.Trigger
		ref={ref}
		className={cx(
			"flex px-20 py-12 w-full items-center justify-between whitespace-nowrap rounded-lg border bg-transparent text-md shadow-sm ring-offset-transparent focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[placeholder]:text-[#151515]/50",
			className,
		)}
		{...props}
	>
		{children}
		<RXSelect.Icon asChild>
			<Icon.Caret.Sort className="h-16 w-16 opacity-50" />
		</RXSelect.Icon>
	</RXSelect.Trigger>
));

SelectTrigger.displayName = RXSelect.Trigger.displayName;

export const SelectScrollUpButton = forwardRef<
	React.ElementRef<typeof RXSelect.ScrollUpButton>,
	React.ComponentPropsWithoutRef<typeof RXSelect.ScrollUpButton>
>(({className, ...props}, ref) => (
	<RXSelect.ScrollUpButton
		ref={ref}
		className={cx(
			"flex cursor-default items-center justify-center py-4",
			className,
		)}
		{...props}
	>
		<Icon.Chevron.Up />
	</RXSelect.ScrollUpButton>
));

SelectScrollUpButton.displayName = RXSelect.ScrollUpButton.displayName;

export const SelectScrollDownButton = forwardRef<
	React.ElementRef<typeof RXSelect.ScrollDownButton>,
	React.ComponentPropsWithoutRef<typeof RXSelect.ScrollDownButton>
>(({className, ...props}, ref) => (
	<RXSelect.ScrollDownButton
		ref={ref}
		className={cx(
			"flex cursor-default items-center justify-center py-4",
			className,
		)}
		{...props}
	>
		<Icon.Chevron.Down />
	</RXSelect.ScrollDownButton>
));

SelectScrollDownButton.displayName = RXSelect.ScrollDownButton.displayName;

export const SelectContent = forwardRef<
	React.ElementRef<typeof RXSelect.Content>,
	React.ComponentPropsWithoutRef<typeof RXSelect.Content>
>(({className, children, position = "popper", ...props}, ref) => (
	<RXSelect.Portal>
		<RXSelect.Content
			ref={ref}
			className={cx(
				"relative z-50 max-h-[38rem] min-w-[12rem] overflow-hidden rounded-md border bg-[#fff] text-[#151515] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				position === "popper" &&
					"data-[side=bottom]:translate-y-4 data-[side=left]:-translate-x-4 data-[side=right]:translate-x-4 data-[side=top]:-translate-y-4",
				className,
			)}
			position={position}
			{...props}
		>
			<SelectScrollUpButton />
			<RXSelect.Viewport
				className={cx(
					"p-1",
					position === "popper" &&
						"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
				)}
			>
				{children}
			</RXSelect.Viewport>
			<SelectScrollDownButton />
		</RXSelect.Content>
	</RXSelect.Portal>
));

SelectContent.displayName = RXSelect.Content.displayName;

export const SelectLabel = forwardRef<
	React.ElementRef<typeof RXSelect.Label>,
	React.ComponentPropsWithoutRef<typeof RXSelect.Label>
>(({className, ...props}, ref) => (
	<RXSelect.Label
		ref={ref}
		className={cx("px-8 py-6 text-sm font-semibold", className)}
		{...props}
	/>
));

SelectLabel.displayName = RXSelect.Label.displayName;

export const SelectItem = forwardRef<
	React.ElementRef<typeof RXSelect.Item>,
	React.ComponentPropsWithoutRef<typeof RXSelect.Item>
>(({className, children, ...props}, ref) => (
	<RXSelect.Item
		ref={ref}
		className={cx(
			"relative flex w-full cursor-default select-none items-center rounded-sm py-8 pl-14 pr-32 text-sm outline-none focus:bg-[#f4f4f4] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute right-8 flex h-14 w-14 items-center justify-center">
			<RXSelect.ItemIndicator>
				<Icon.Check className="h-16 w-16" />
			</RXSelect.ItemIndicator>
		</span>
		<RXSelect.ItemText>{children}</RXSelect.ItemText>
	</RXSelect.Item>
));

SelectItem.displayName = RXSelect.Item.displayName;

export const SelectSeparator = forwardRef<
	React.ElementRef<typeof RXSelect.Separator>,
	React.ComponentPropsWithoutRef<typeof RXSelect.Separator>
>(({className, ...props}, ref) => (
	<RXSelect.Separator
		ref={ref}
		className={cx("-mx-4 my-4 h-px bg-[#dedede]", className)}
		{...props}
	/>
));

SelectSeparator.displayName = RXSelect.Separator.displayName;
