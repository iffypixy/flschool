import {forwardRef} from "react";
import {Link} from "wouter";
import {Slot} from "@radix-ui/react-slot";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui";

export const Breadcrumb = forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<"nav"> & {
		separator?: React.ReactNode;
	}
>(({...props}, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);

Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = forwardRef<
	HTMLOListElement,
	React.ComponentPropsWithoutRef<"ol">
>(({className, ...props}, ref) => (
	<ol
		ref={ref}
		className={cx(
			"flex flex-wrap items-center gap-10 break-words xs:text-24 text-18 text-[#909090] sm:gap-8",
			className,
		)}
		{...props}
	/>
));

BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<"li">
>(({className, ...props}, ref) => (
	<li
		ref={ref}
		className={cx("inline-flex items-center gap-4", className)}
		{...props}
	/>
));

BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<typeof Link> & {
		className?: string;
		asChild?: boolean;
	}
>(({asChild, className, ...props}, ref) => {
	const Comp = asChild ? Slot : Link;

	return (
		<Comp
			ref={ref}
			className={cx("transition-colors hover:text-[#434343]", className)}
			{...props}
		/>
	);
});

BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = forwardRef<
	HTMLSpanElement,
	React.ComponentPropsWithoutRef<"span">
>(({className, ...props}, ref) => (
	<span
		ref={ref}
		role="link"
		aria-disabled="true"
		aria-current="page"
		className={cx("font-normal text-[#434343]", className)}
		{...props}
	/>
));

BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = (props: React.ComponentProps<"li">) => (
	<li role="presentation" aria-hidden="true" {...props}>
		<span className="text-[#909090]">/</span>
	</li>
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		role="presentation"
		aria-hidden="true"
		className={cx("flex size-16 items-center justify-center", className)}
		{...props}
	>
		<Icon.Dots.Horizontal className="size-8" />
		<span className="sr-only">More</span>
	</span>
);

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";
