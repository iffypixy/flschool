import {forwardRef} from "react";
import {cx} from "class-variance-authority";

export const Table = forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({className, ...props}, ref) => (
	<div className="relative w-full overflow-auto">
		<table
			ref={ref}
			className={cx("w-full caption-bottom text-sm", className)}
			{...props}
		/>
	</div>
));

Table.displayName = "Table";

export const TableHeader = forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<thead ref={ref} className={cx("[&_tr]:border-b", className)} {...props} />
));

TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<tbody
		ref={ref}
		className={cx("[&_tr:last-child]:border-0", className)}
		{...props}
	/>
));

TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<tfoot
		ref={ref}
		className={cx(
			"border-t bg-[#dedede]/50 font-medium [&>tr]:last:border-b-0",
			className,
		)}
		{...props}
	/>
));

TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({className, ...props}, ref) => (
	<tr
		ref={ref}
		className={cx(
			"border-b transition-colors hover:bg-[#dedede]/50 data-[state=selected]:bg-[#dedede]",
			className,
		)}
		{...props}
	/>
));

TableRow.displayName = "TableRow";

export const TableHead = forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
	<th
		ref={ref}
		className={cx(
			"h-48 px-16 text-left align-middle font-medium text-[#434343] [&:has([role=checkbox])]:pr-0",
			className,
		)}
		{...props}
	/>
));

TableHead.displayName = "TableHead";

export const TableCell = forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
	<td
		ref={ref}
		className={cx(
			"p-16 align-middle [&:has([role=checkbox])]:pr-0",
			className,
		)}
		{...props}
	/>
));

TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({className, ...props}, ref) => (
	<caption
		ref={ref}
		className={cx("mt-16 text-sm text-[#434343]", className)}
		{...props}
	/>
));

TableCaption.displayName = "TableCaption";
