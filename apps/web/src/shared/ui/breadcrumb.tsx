import {forwardRef} from "react";
import {Slot} from "@radix-ui/react-slot";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui";

const Breadcrumb = forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<"nav"> & {
		separator?: React.ReactNode;
	}
>(({...props}, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef<
	HTMLOListElement,
	React.ComponentPropsWithoutRef<"ol">
>(({className, ...props}, ref) => (
	<ol
		ref={ref}
		className={cx(
			"flex flex-wrap items-center gap-12 break-words text-16 text-[#909090] sm:gap-8",
			className,
		)}
		{...props}
	/>
));

BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef<
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

const BreadcrumbLink = forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<"a"> & {
		asChild?: boolean;
	}
>(({asChild, className, ...props}, ref) => {
	const Comp = asChild ? Slot : "a";

	return (
		<Comp
			ref={ref}
			className={cx("transition-colors hover:text-[#434343]", className)}
			{...props}
		/>
	);
});

BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = forwardRef<
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

const BreadcrumbSeparator = ({
	children,
	...props
}: React.ComponentProps<"li">) => (
	<li role="presentation" aria-hidden="true" {...props}>
		{children ?? <Icon.Chevron.Right className="fill-[#909090] size-12" />}
	</li>
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		role="presentation"
		aria-hidden="true"
		className={cx("flex size-16 items-center justify-center", className)}
		{...props}
	>
		<Icon.Dots className="size-8" />
		<span className="sr-only">More</span>
	</span>
);

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
