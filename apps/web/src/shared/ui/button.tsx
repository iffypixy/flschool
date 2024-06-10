import {cva, cx} from "class-variance-authority";

const styles = cva(
	"rounded-12 text-center py-[1rem] px-[2.4rem] font-gotham font-medium text-[1.4rem]",
	{
		variants: {
			color: {
				primary: "bg-primary text-white",
				secondary: "bg-transparent text-black border border-primary",
			},
		},
	},
);

interface ButtonProps extends React.ComponentProps<"button"> {
	color?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
	className,
	color = "primary",
	...props
}) => <button {...props} className={styles({className, color})} />;

export const GradientButton: React.FC<React.ComponentProps<"button">> = ({
	children,
	className,
	...props
}) => (
	<button
		className={cx(
			"rounded-12 bg-white text-center py-10 px-24 font-gotham font-medium text-[1.8rem]",
			className,
		)}
		{...props}
	>
		<span className="bg-gradient bg-clip-text text-transparent">
			{children}
		</span>
	</button>
);
