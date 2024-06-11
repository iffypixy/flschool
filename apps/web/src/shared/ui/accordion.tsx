import {forwardRef} from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({className, ...props}, ref) => (
	<AccordionPrimitive.Item ref={ref} className={className} {...props} />
));

AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps
	extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

export const AccordionTrigger = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	AccordionTriggerProps
>(({className, children, ...props}, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cx(
				"flex flex-1 items-center text-left justify-between py-6 text-30 text-[#434343] font-bold font-gilroy transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}

			<Icon.Chevron.Down className="w-[3rem] h-auto fill-primary shrink-0 transition-transform duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionContent = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({className, children, ...props}, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-14 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cx("pb-6 pt-0", className)}>{children}</div>
	</AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;
