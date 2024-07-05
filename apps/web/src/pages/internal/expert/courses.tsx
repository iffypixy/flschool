import {Link} from "wouter";

import {ExpertTemplate, useMyCourses} from "@features/cms/expert";
import {courseTypeToLabel} from "@entities/course";
import {ROUTER_PATHS} from "@app/router/paths";

export const InternalExpertCoursesPage: React.FC = () => {
	const {courses} = useMyCourses();

	return (
		<ExpertTemplate>
			<div className="flex flex-col space-y-44">
				<h3 className="font-bold text-56">Мои курсы</h3>

				<div className="flex flex-wrap -m-16">
					{courses?.map((course) => (
						<Link
							key={course.id}
							to={ROUTER_PATHS.INTERNAL.EXPERT.COURSE.filled(
								course.id,
							)}
							className="w-1/3 p-16"
						>
							<div className="flex flex-col bg-[#F8F8F8] shadow-even-sm space-y-20 rounded-12 p-28">
								<div className="flex items-center space-x-12">
									<span className="bg-gradient p-8 rounded-8 text-[#FBFBFB] text-14">
										{courseTypeToLabel(course.type)}
									</span>
								</div>

								<h5 className="text-[#434343] font-bold text-28">
									{course.name}
								</h5>

								<div className="flex flex-col text-18">
									<div className="flex items-center space-x-8">
										<span className="text-[#434343] font-medium">
											<span className="text-[#A5A2A2]">
												Кол-во студентов:
											</span>{" "}
											{course.students}
										</span>
									</div>

									<div className="flex items-center space-x-8">
										<span className="text-[#434343] font-medium">
											<span className="text-[#A5A2A2]">
												Обратная связь
											</span>{" "}
											{course.pendingHwAnswers}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</ExpertTemplate>
	);
};
