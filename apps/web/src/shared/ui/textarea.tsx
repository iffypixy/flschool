import {forwardRef} from "react";
import {cx} from "class-variance-authority";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({className, ...props}, ref) => {
		return (
			<textarea
				className={cx(
					"flex min-h-80 w-full rounded-lg border border-input bg-transparent px-12 py-8 text-md ring-offset-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);

Textarea.displayName = "Textarea";
