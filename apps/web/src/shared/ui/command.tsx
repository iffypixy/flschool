import {forwardRef} from "react";
import {type DialogProps} from "@radix-ui/react-dialog";
import {Command as CommandPrimitive} from "cmdk";
import {cx} from "class-variance-authority";

import {Icon, Modal, ModalContent} from "@shared/ui";

export const Command = forwardRef<
	React.ElementRef<typeof CommandPrimitive>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({className, ...props}, ref) => (
	<CommandPrimitive
		ref={ref}
		className={cx(
			"flex h-full w-full flex-col overflow-hidden rounded-md bg-[#fff] text-[#151515]",
			className,
		)}
		{...props}
	/>
));

Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

export const CommandDialog = ({children, ...props}: CommandDialogProps) => {
	return (
		<Modal {...props}>
			<ModalContent className="overflow-hidden p-0">
				<Command className="[&_[cmdk-group-heading]]:px-8 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[#434343] [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-8 [&_[cmdk-input-wrapper]_svg]:h-20 [&_[cmdk-input-wrapper]_svg]:w-20 [&_[cmdk-input]]:h-48 [&_[cmdk-item]]:px-8 [&_[cmdk-item]]:py-12 [&_[cmdk-item]_svg]:h-20 [&_[cmdk-item]_svg]:w-20">
					{children}
				</Command>
			</ModalContent>
		</Modal>
	);
};

export const CommandInput = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Input>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({className, ...props}, ref) => (
	<div className="flex items-center border-b px-12" cmdk-input-wrapper="">
		<Icon.Magnifier className="mr-12 h-16 w-16 shrink-0 opacity-50 fill-[#434343]" />

		<CommandPrimitive.Input
			ref={ref}
			className={cx(
				"flex h-40 w-full rounded-md bg-transparent py-12 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	</div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

export const CommandList = forwardRef<
	React.ElementRef<typeof CommandPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({className, ...props}, ref) => (
	<CommandPrimitive.List
		ref={ref}
		className={cx(
			"max-h-[30rem] overflow-y-auto overflow-x-hidden",
			className,
		)}
		{...props}
	/>
));

CommandList.displayName = CommandPrimitive.List.displayName;

export const CommandEmpty = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Empty>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
	<CommandPrimitive.Empty
		ref={ref}
		className="py-24 text-center text-sm"
		{...props}
	/>
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandGroup = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({className, ...props}, ref) => (
	<CommandPrimitive.Group
		ref={ref}
		className={cx(
			"overflow-hidden p-4 text-[#151515] [&_[cmdk-group-heading]]:px-8 [&_[cmdk-group-heading]]:py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[#434343]",
			className,
		)}
		{...props}
	/>
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

export const CommandSeparator = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({className, ...props}, ref) => (
	<CommandPrimitive.Separator
		ref={ref}
		className={cx("-mx-4 h-px bg-border", className)}
		{...props}
	/>
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export const CommandItem = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({className, ...props}, ref) => (
	<CommandPrimitive.Item
		ref={ref}
		className={cx(
			"relative flex cursor-default select-none items-center rounded-sm px-8 py-6 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-[#efefef] data-[selected=true]:text-[#000] data-[disabled=true]:opacity-50",
			className,
		)}
		{...props}
	/>
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

export const CommandShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cx(
				"ml-auto text-xs tracking-widest text-[#434343]",
				className,
			)}
			{...props}
		/>
	);
};

CommandShortcut.displayName = "CommandShortcut";
