import {forwardRef} from "react";
import {cx} from "class-variance-authority";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export const Input = forwardRef<React.ElementRef<"input">, InputProps>(
	({className, type, ...props}, ref) => {
		return (
			<input
				type={type}
				className={cx(
					"flex w-full text-[#151515] rounded-lg border bg-transparent px-20 py-12 text-md shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";
