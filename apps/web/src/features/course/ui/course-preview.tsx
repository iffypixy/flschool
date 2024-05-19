import {Icon} from "@shared/ui";

interface CoursePreviewProps {
	avatar: string;
	author: string;
	name: string;
}

export const CoursePreview: React.FC<CoursePreviewProps> = ({
	avatar,
	author,
	name,
}) => (
	<div className="h-[25rem] !flex justify-between bg-gradient-1 rounded-[2rem] p-[3rem] m-[1.4rem]">
		<div className="flex flex-col w-[55%] justify-between">
			<div className="flex flex-col font-gilroy text-white space-y-2">
				<h6 className="font-bold text-[3.2rem] leading-[3.8rem]">
					{name}
				</h6>

				<span className="text-[2.2rem] font-medium">{author}</span>
			</div>

			<button className="bg-[#FFFFFF] text-black inline-flex items-center space-x-8 w-fit rounded-[1rem] py-[1rem] px-[2rem] whitespace-nowrap">
				<span className="font-gilroy font-medium text-[2.2rem]">
					Смотреть эфир
				</span>

				<Icon.Play className="fill-primary w-[2.6rem] h-auto" />
			</button>
		</div>

		<img
			src={avatar}
			alt="Автор курса"
			className="w-[40%] max-h-full object-contain mt-auto mr-[-3rem]"
		/>
	</div>
);
