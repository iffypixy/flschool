import {Link} from "wouter";

import {AdminTemplate, AdminButton, useAllCourses} from "@features/cms/admin";
import {Center, Fullscreen, Loader} from "@shared/ui";
import {ROUTER_PATHS} from "@app/router/paths";

export const InternalAdminCoursesPage: React.FC = () => {
	const {courses, isFetching} = useAllCourses();

	if (isFetching)
		return (
			<Fullscreen>
				<Center>
					<Loader />
				</Center>
			</Fullscreen>
		);

	return (
		<AdminTemplate
			title="Наши курсы"
			button={
				<Link to={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_COURSE}>
					<AdminButton>Создать курс</AdminButton>
				</Link>
			}
		>
			<div className="flex flex-wrap -m-16 md:flex-col">
				{courses?.map((course, idx) => (
					<Link
						key={idx}
						to={ROUTER_PATHS.INTERNAL.ADMIN.COURSE.filled(
							course.id,
						)}
						className="w-1/3 p-16 lg:w-1/2 md:w-full"
					>
						<div className="flex flex-col bg-[#fff] shadow-even-sm rounded-8 space-y-20 p-28">
							<h6 className="font-semibold text-[#3c3c3c] text-20">
								{course.name}
							</h6>

							<div className="flex flex-col">
								<div className="flex items-center space-x-8 font-medium text-18">
									<span className="text-[#a6acb8]">
										Уроков:
									</span>

									<span className="text-[#434343]">
										{course.lessons}
									</span>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</AdminTemplate>
	);
};
