import {cx} from "class-variance-authority";

interface FeatureProps {
	title: string;
	description: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
	highlighted?: number;
}

export const Feature: React.FC<FeatureProps> = ({
	title,
	description,
	Icon,
	highlighted = 0,
}) => {
	const words = title.split(" ");

	return (
		<div className="w-[48%] flex space-x-[4rem] my-[4rem] items-center xs:w-full">
			<Icon className="min-w-[5rem] min-h-[5rem] max-w-[5rem] max-h-[5rem]" />

			<div className="flex flex-col space-y-4">
				<h6 className="font-gilroy font-bold text-[3rem] text-[#434343]">
					{words.map((word, idx) => (
						<span key={idx}>
							<span
								className={cx({
									["text-primary"]: idx < highlighted,
								})}
							>
								{word}
							</span>{" "}
						</span>
					))}
				</h6>

				<span className="font-gilroy text-[2.4rem]">{description}</span>
			</div>
		</div>
	);
};
