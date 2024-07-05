import {Link} from "wouter";

import {ROUTER_PATHS} from "@app/router/paths";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Icon,
} from "@shared/ui";

import {Lesson} from "../types";

interface LessonsListProps {
	lessons: {
		id: Lesson["id"];
		name: Lesson["name"];
		topics: Lesson["topics"];
		order: Lesson["order"];
	}[];
	courseId: string;
	progress: number;
	isEnrolled: boolean;
}

export const LessonsList: React.FC<LessonsListProps> = ({
	lessons,
	progress,
	isEnrolled,
	courseId,
}) => {
	return (
		<Accordion type="multiple" className="flex flex-col space-y-16">
			{lessons.map((lesson) => {
				const isAccessible = progress >= lesson.order && isEnrolled;

				const content = (
					<AccordionItem
						key={lesson.id}
						value={lesson.id}
						className="bg-[#fff] shadow-even-sm rounded-lg"
					>
						<AccordionTrigger className="!text-20 xs:!text-22 font-medium !p-22 [&[data-state=open]]:border-b border-b-[#909090] hover:no-underline [&>svg]:fill-[#434343] [&>svg]:w-18">
							<div className="flex flex-1 items-center space-x-18">
								{isAccessible ? (
									<Icon.CheckRounded className="w-26 h-auto text-[#03C1CD]" />
								) : (
									<Icon.Blocked className="w-24 h-auto text-primary" />
								)}

								<span className="text-primary">
									{lesson.name}
								</span>
							</div>
						</AccordionTrigger>

						<AccordionContent className="!p-22 text-16 xs:text-22">
							<ul className="list-disc ml-16 space-y-4">
								{lesson.topics.map((topic, idx) => (
									<li key={idx}>{topic}</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				);

				if (isAccessible)
					return (
						<Link
							key={lesson.id}
							to={ROUTER_PATHS.LESSON.filled(courseId, lesson.id)}
						>
							<div className="text-20 xs:text-22 font-medium p-22 bg-[#fff] shadow-even-sm rounded-lg flex items-center justify-between">
								<div className="flex flex-1 items-center space-x-18">
									<Icon.CheckRounded className="w-26 h-auto text-[#03C1CD]" />

									<span className="text-[#03C1CD]">
										{lesson.name}
									</span>
								</div>

								<Icon.Arrow.Right className="fill-[#03C1CD] w-18 h-auto" />
							</div>
						</Link>
					);

				return content;
			})}
		</Accordion>
	);
};
