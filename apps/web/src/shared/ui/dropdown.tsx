import {forwardRef} from "react";
import {cx} from "class-variance-authority";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {Icon} from "@shared/ui";

export const DropdownRoot = DropdownMenu.Root;
export const DropdownTrigger = DropdownMenu.Trigger;
export const DropdownGroup = DropdownMenu.Group;
export const DropdownPortal = DropdownMenu.Portal;
export const DropdownSub = DropdownMenu.Sub;
export const DropdownRadioGroup = DropdownMenu.RadioGroup;

interface DropdownSubTriggerProps {
	inset?: boolean;
}

export const DropdownSubTrigger = forwardRef<
	React.ElementRef<typeof DropdownMenu.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenu.SubTrigger> &
		DropdownSubTriggerProps
>(({className, children, inset, ...props}, ref) => (
	<DropdownMenu.SubTrigger
		ref={ref}
		className={cx(
			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
			{
				"pl-8": inset,
			},
			className,
		)}
		{...props}
	>
		{children}

		<Icon.Chevron.Right className="ml-auto h-4 w-4" />
	</DropdownMenu.SubTrigger>
));

DropdownSubTrigger.displayName = DropdownMenu.SubTrigger.displayName;

export const DropdownSubContent = forwardRef<
	React.ElementRef<typeof DropdownMenu.SubContent>,
	React.ComponentPropsWithoutRef<typeof DropdownMenu.SubContent>
>(({className, ...props}, ref) => (
	<DropdownMenu.SubContent
		ref={ref}
		className={cx(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className,
		)}
		{...props}
	/>
));

DropdownSubContent.displayName = DropdownMenu.SubContent.displayName;

export const DropdownContent = forwardRef<
	React.ElementRef<typeof DropdownMenu.Content>,
	React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(({className, sideOffset = 4, ...props}, ref) => (
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cx(
				"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className,
			)}
			{...props}
		/>
	</DropdownMenu.Portal>
));

DropdownContent.displayName = DropdownMenu.Content.displayName;

interface DropdownItemProps {
	inset?: boolean;
}

export const DropdownItem = forwardRef<
	React.ElementRef<typeof DropdownMenu.Item>,
	React.ComponentPropsWithoutRef<typeof DropdownMenu.Item> & DropdownItemProps
>(({className, inset, ...props}, ref) => (
	<DropdownMenu.Item
		ref={ref}
		className={cx(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			{
				"pl-8": inset,
			},
			className,
		)}
		{...props}
	/>
));

DropdownItem.displayName = DropdownMenu.Item.displayName;

export const DropdownCheckboxItem = forwardRef<
	React.ElementRef<typeof DropdownMenu.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenu.CheckboxItem>
>(({className, children, checked, ...props}, ref) => (
	<DropdownMenu.CheckboxItem
		ref={ref}
		className={cx(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenu.ItemIndicator>
				<Icon.Check className="h-4 w-4" />
			</DropdownMenu.ItemIndicator>
		</span>

		{children}
	</DropdownMenu.CheckboxItem>
));

DropdownCheckboxItem.displayName = DropdownMenu.CheckboxItem.displayName;

export const DropdownRadioItem = forwardRef<
	React.ElementRef<typeof DropdownMenu.RadioItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenu.RadioItem>
>(({className, children, ...props}, ref) => (
	<DropdownMenu.RadioItem
		ref={ref}
		className={cx(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenu.ItemIndicator>
				<Icon.Dot className="h-4 w-4 fill-current" />
			</DropdownMenu.ItemIndicator>
		</span>

		{children}
	</DropdownMenu.RadioItem>
));

DropdownRadioItem.displayName = DropdownMenu.RadioItem.displayName;

export const DropdownLabel = forwardRef<
	React.ElementRef<typeof DropdownMenu.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenu.Label> & {
		inset?: boolean;
	}
>(({className, inset, ...props}, ref) => (
	<DropdownMenu.Label
		ref={ref}
		className={cx(
			"px-2 py-1.5 text-sm font-semibold",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));

DropdownLabel.displayName = DropdownMenu.Label.displayName;

export const DropdownSeparator = forwardRef<
	React.ElementRef<typeof DropdownMenu.Separator>,
	React.ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>(({className, ...props}, ref) => (
	<DropdownMenu.Separator
		ref={ref}
		className={cx("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
));

DropdownSeparator.displayName = DropdownMenu.Separator.displayName;

export const DropdownShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cx("ml-auto text-xs tracking-widest opacity-60", className)}
		{...props}
	/>
);

DropdownShortcut.displayName = "DropdownMenuShortcut";
