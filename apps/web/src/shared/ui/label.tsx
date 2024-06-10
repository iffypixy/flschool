import {cx} from "class-variance-authority";

export const Label: React.FC<React.ComponentProps<"label">> = ({
	className,
	...props
}) => (
	/* eslint-disable-next-line jsx-a11y/label-has-associated-control */
	<label
		className={cx(
			"text-white font-manrope font-semibold text-[1.4rem]",
			className,
		)}
		{...props}
	/>
);
