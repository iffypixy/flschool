import {cva, cx} from "class-variance-authority";
import {forwardRef} from "react";

const styles = cva("rounded-12 text-center py-10 px-24 font-medium text-lg", {
	variants: {
		color: {
			primary: "bg-primary text-primary-contrast",
			secondary: "bg-transparent text-[#151515] border border-primary",
			gradient: "bg-gradient text-[#fff]",
			error: "bg-[#ca4040] text-[#fff]",
		},
	},
});

interface ButtonProps extends React.ComponentProps<"button"> {
	color?: "primary" | "secondary" | "gradient" | "error";
}

export const Button = forwardRef<React.ElementRef<"button">, ButtonProps>(
	({className, color = "primary", ...props}, ref) => (
		<button
			ref={ref}
			{...props}
			className={cx(styles({color, className}), {
				"opacity-60 cursor-not-allowed": props.disabled,
			})}
		/>
	),
);

export const GradientButton: React.FC<React.ComponentProps<"button">> = ({
	children,
	className,
	...props
}) => (
	<button
		className={cx(
			"rounded-12 bg-[#fbfbfb] text-center py-12 px-24 font-medium text-20",
			className,
			{
				"opacity-60 cursor-not-allowed": props.disabled,
			},
		)}
		{...props}
	>
		<span className="bg-gradient bg-clip-text text-transparent">
			{children}
		</span>
	</button>
);

export const HighlightButton: React.FC<React.ComponentProps<typeof Button>> = ({
	className,
	...props
}) => (
	<Button
		{...props}
		color="primary"
		className={cx(
			"h-fit shadow-primary/30 shadow-border-md py-18",
			className,
		)}
	/>
);
