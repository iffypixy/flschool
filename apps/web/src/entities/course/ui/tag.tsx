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
				"px-20 py-10 border border-double border-transparent bg-origin-border rounded-12 font-medium text-[15px] text-[#434343] cursor-pointer hover:bg-[#E0D4F7] hover:!bg-none transition-colors duration-300",
				className,
			)}
			{...props}
		/>
	);
};
