import {forwardRef} from "react";
import {cx} from "class-variance-authority";
import * as RXDropdownMenu from "@radix-ui/react-dropdown-menu";

import {Icon} from "@shared/ui";

export const Dropdown = RXDropdownMenu.Root;
export const DropdownTrigger = RXDropdownMenu.Trigger;
export const DropdownGroup = RXDropdownMenu.Group;
export const DropdownPortal = RXDropdownMenu.Portal;
export const DropdownSub = RXDropdownMenu.Sub;
export const DropdownRadioGroup = RXDropdownMenu.RadioGroup;

interface DropdownSubTriggerProps {
	inset?: boolean;
}

export const DropdownSubTrigger = forwardRef<
	React.ElementRef<typeof RXDropdownMenu.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof RXDropdownMenu.SubTrigger> &
		DropdownSubTriggerProps
>(({className, children, inset, ...props}, ref) => (
	<RXDropdownMenu.SubTrigger
		ref={ref}
		className={cx(
			"flex cursor-default select-none items-center rounded-sm px-[0.32rem] py-[0.24rem] text-14 outline-none",
			{
				"pl-14": inset,
			},
			className,
		)}
		{...props}
	>
		{children}

		<Icon.Chevron.Right className="ml-auto h-4 w-4" />
	</RXDropdownMenu.SubTrigger>
));

DropdownSubTrigger.displayName = RXDropdownMenu.SubTrigger.displayName;

export const DropdownSubContent = forwardRef<
	React.ElementRef<typeof RXDropdownMenu.SubContent>,
	React.ComponentPropsWithoutRef<typeof RXDropdownMenu.SubContent>
>(({className, ...props}, ref) => (
	<RXDropdownMenu.SubContent
		ref={ref}
		className={cx(
			"z-50 min-w-[8rem] overflow-hidden rounded-8 border bg-popover p-2 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className,
		)}
		{...props}
	/>
));

DropdownSubContent.displayName = RXDropdownMenu.SubContent.displayName;

export const DropdownContent = forwardRef<
	React.ElementRef<typeof RXDropdownMenu.Content>,
	React.ComponentPropsWithoutRef<typeof RXDropdownMenu.Content>
>(({className, sideOffset = 4, ...props}, ref) => (
	<RXDropdownMenu.Portal>
		<RXDropdownMenu.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cx(
				"z-50 min-w-[8rem] overflow-hidden rounded-8 border bg-popover p-2 shadow-md",
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className,
			)}
			{...props}
		/>
	</RXDropdownMenu.Portal>
));

DropdownContent.displayName = RXDropdownMenu.Content.displayName;

interface DropdownItemProps {
	inset?: boolean;
}

export const DropdownItem = forwardRef<
	React.ElementRef<typeof RXDropdownMenu.Item>,
	React.ComponentPropsWithoutRef<typeof RXDropdownMenu.Item> &
		DropdownItemProps
>(({className, inset, ...props}, ref) => (
	<RXDropdownMenu.Item
		ref={ref}
		className={cx(
			"relative flex cursor-default select-none items-center rounded-4 px-[0.32rem] py-[0.24rem] text-14 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			{
				"pl-14": inset,
			},
			className,
		)}
		{...props}
	/>
));

DropdownItem.displayName = RXDropdownMenu.Item.displayName;

export const DropdownCheckboxItem = forwardRef<
	React.ElementRef<typeof RXDropdownMenu.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof RXDropdownMenu.CheckboxItem>
>(({className, children, checked, ...props}, ref) => (
	<RXDropdownMenu.CheckboxItem
		ref={ref}
		className={cx(
			"relative flex cursor-default select-none items-center rounded-4 py-[0.24rem] pl-14 pr-4 text-14 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-4 flex size-8 items-center justify-center">
			<RXDropdownMenu.ItemIndicator>
				<Icon.Check className="size-8" />
			</RXDropdownMenu.ItemIndicator>
		</span>

		{children}
	</RXDropdownMenu.CheckboxItem>
));

DropdownCheckboxItem.displayName = RXDropdownMenu.CheckboxItem.displayName;

export const DropdownRadioItem = forwardRef<
	React.ElementRef<typeof RXDropdownMenu.RadioItem>,
	React.ComponentPropsWithoutRef<typeof RXDropdownMenu.RadioItem>
>(({className, children, ...props}, ref) => (
	<RXDropdownMenu.RadioItem
		ref={ref}
		className={cx(
			"relative flex cursor-default select-none items-center rounded-4 py-[0.24rem] pl-14 pr-4 text-14 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute left-4 flex size-8 items-center justify-center">
			<RXDropdownMenu.ItemIndicator>
				<Icon.Dot className="size-8 fill-current" />
			</RXDropdownMenu.ItemIndicator>
		</span>

		{children}
	</RXDropdownMenu.RadioItem>
));

DropdownRadioItem.displayName = RXDropdownMenu.RadioItem.displayName;

export const DropdownLabel = forwardRef<
	React.ElementRef<typeof RXDropdownMenu.Label>,
	React.ComponentPropsWithoutRef<typeof RXDropdownMenu.Label> & {
		inset?: boolean;
	}
>(({className, inset, ...props}, ref) => (
	<RXDropdownMenu.Label
		ref={ref}
		className={cx(
			"px-[0.32rem] py-[0.24rem] text-14 font-semibold",
			inset && "pl-14",
			className,
		)}
		{...props}
	/>
));

DropdownLabel.displayName = RXDropdownMenu.Label.displayName;

export const DropdownSeparator = forwardRef<
	React.ElementRef<typeof RXDropdownMenu.Separator>,
	React.ComponentPropsWithoutRef<typeof RXDropdownMenu.Separator>
>(({className, ...props}, ref) => (
	<RXDropdownMenu.Separator
		ref={ref}
		className={cx("-mx-2 my-2 h-px", className)}
		{...props}
	/>
));

DropdownSeparator.displayName = RXDropdownMenu.Separator.displayName;

export const DropdownShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cx("ml-auto text-12 tracking-widest opacity-60", className)}
		{...props}
	/>
);

DropdownShortcut.displayName = "DropdownMenuShortcut";
