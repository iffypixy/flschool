import {forwardRef} from "react";
import * as RXAccordion from "@radix-ui/react-accordion";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui";

export const Accordion = RXAccordion.Root;

export const AccordionItem = forwardRef<
	React.ElementRef<typeof RXAccordion.Item>,
	React.ComponentPropsWithoutRef<typeof RXAccordion.Item>
>(({className, ...props}, ref) => (
	<RXAccordion.Item
		ref={ref}
		className={cx("border-b", className)}
		{...props}
	/>
));

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
	React.ElementRef<typeof RXAccordion.Trigger>,
	React.ComponentPropsWithoutRef<typeof RXAccordion.Trigger>
>(({className, children, ...props}, ref) => (
	<RXAccordion.Header className="flex">
		<RXAccordion.Trigger
			ref={ref}
			className={cx(
				"flex flex-1 text-left justify-between items-center py-16 text-22 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}

			<Icon.Chevron.Down className="w-16 h-16 shrink-0 fill-[#fbfbfb] transition-transform duration-200" />
		</RXAccordion.Trigger>
	</RXAccordion.Header>
));

AccordionTrigger.displayName = RXAccordion.Trigger.displayName;

export const AccordionContent = forwardRef<
	React.ElementRef<typeof RXAccordion.Content>,
	React.ComponentPropsWithoutRef<typeof RXAccordion.Content>
>(({className, children, ...props}, ref) => (
	<RXAccordion.Content
		ref={ref}
		className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cx("pb-16 pt-0", className)}>{children}</div>
	</RXAccordion.Content>
));

AccordionContent.displayName = RXAccordion.Content.displayName;
