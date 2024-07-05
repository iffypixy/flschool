import {cx} from "class-variance-authority";

export const CourseTag: React.FC<React.ComponentProps<"span">> = ({
	className,
	...props
}) => {
	return (
		<span
			style={{
				borderImageSlice: 1,
				backgroundClip: "padding-box, border-box",
				backgroundImage:
					"linear-gradient(#F8F8F8, #F8F8F8), linear-gradient(90deg, #03C1CD 0%, #7138E7 100%)",
			}}
			className={cx(
				"px-16 py-8 border border-double border-transparent bg-origin-border rounded-12 font-medium text-18 text-[#434343] cursor-pointer",
				className,
			)}
			{...props}
		/>
	);
};
