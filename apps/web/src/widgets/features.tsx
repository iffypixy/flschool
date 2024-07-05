import {cx} from "class-variance-authority";

interface FeatureProps {
	title: string;
	description: string;
	icon: React.ReactNode;
	highlighted?: number;
}

export const Feature: React.FC<FeatureProps> = ({
	title,
	description,
	icon,
	highlighted = 0,
}) => {
	const words = title.split(" ");

	return (
		<div className="w-[48%] flex flex-col space-y-4 my-[4rem] xs:w-full">
			<h6 className="font-bold text-[3rem] text-[#434343] ml-[9rem]">
				{words.map((word, idx) => (
					<span
						key={idx}
						className={cx({
							["text-primary"]: idx < highlighted,
						})}
					>
						{word}{" "}
					</span>
				))}
			</h6>

			<div className="flex items-center space-x-[4rem] [&>svg]:min-w-[5rem] [&>svg]:max-w-[5rem] [&>svg]:min-h-[5rem] [&>svg]:max-h-[5rem]">
				{icon}

				<span className="text-[2.4rem] font-medium">{description}</span>
			</div>
		</div>
	);
};
