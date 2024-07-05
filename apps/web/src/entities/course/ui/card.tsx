import {Icon} from "@shared/ui";

import {CourseType} from "../types";

interface CourseCardProps {
	type: CourseType;
	name: string;
	hook: string;
	rating: number;
	reviews: number;
	duration: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
	type,
	name,
	hook,
	rating,
	reviews,
	duration,
}) => {
	return (
		<div className="w-full flex flex-col space-y-16 bg-[#fff] text-[#434343] shadow-even-sm rounded-24 relative p-24">
			<div className="flex items-center space-x-8 xs:text-20">
				{type === "FL_TEENS" && (
					<span className="bg-gradient text-[#fbfbfb] px-12 py-6 rounded-8">
						Для детей
					</span>
				)}

				<span className="bg-[#e3d7fa] text-[#151515] px-12 py-6 rounded-8">
					Месяцев: {duration}
				</span>

				<span className="bg-[#e3d7fa] text-[#151515] px-12 py-6 rounded-8">
					Онлайн
				</span>
			</div>

			<div className="flex flex-col space-y-8">
				<h5 className=" font-bold text-28 xs:text-34 text-inherit">
					{name}
				</h5>

				<p className=" font-normal text-16 xs:text-20 text-inherit">
					{hook}
				</p>

				<div className="flex items-center space-x-8">
					<div className="flex items-center space-x-8">
						<Icon.Star className="fill-[#fcc648] size-20" />

						<span className="text-[#fcc648] font-bold text-20 xs:text-22">
							{rating.toFixed(2)}
						</span>
					</div>

					<span className="font-bold text-18 text-inherit xs:text-20">
						({reviews})
					</span>
				</div>
			</div>
		</div>
	);
};
