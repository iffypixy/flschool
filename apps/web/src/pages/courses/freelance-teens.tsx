import {Link} from "wouter";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Container,
	ContentTemplate,
	HighlightButton,
} from "@shared/ui";
import {
	CourseCard,
	CourseType,
	useFreelanceTeensCourses,
} from "@entities/course";
import {PaymentModal} from "@features/payment";
import {ROUTER_PATHS} from "@app/router/paths";

export const FreelanceTeensCoursesPage: React.FC = () => {
	const {courses} = useFreelanceTeensCourses();

	return (
		<ContentTemplate className="flex flex-col space-y-40">
			<section>
				<Container>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href={ROUTER_PATHS.HOME}>
									Главная
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbPage>Freelance teens</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-34">
						<div className="flex justify-between items-center sm:border-b border-[#ddd] sm:pb-8">
							<h3 className=" text-44 font-bold xs:text-56">
								Freelance teens
							</h3>

							<PaymentModal>
								<HighlightButton className="px-16 sm:fixed sm:left-1/2 sm:bottom-[5%] xs:py-20 sm:w-[75%] sm:-translate-x-1/2 sm:-translate-y-[15%] sm:z-10 sm:text-24 sm:py-28 ring-1">
									Купить набор "Freelance teens"
								</HighlightButton>
							</PaymentModal>
						</div>

						<div className="flex flex-col sm:space-y-16">
							<span className="text-20 xs:text-24 text-[#909090] hidden sm:inline-flex">
								результатов: {courses?.length}
							</span>

							<div className="flex flex-wrap -m-16 sm:flex-nowrap sm:flex-col">
								{courses?.map((course) => (
									<Link
										key={course.id}
										to={`/courses/${course.id}`}
										className="w-1/2 p-16 sm:w-full"
									>
										<CourseCard
											type={CourseType.FL_TEENS}
											name={course.name}
											hook={course.hook}
											duration={course.duration}
											rating={course.rating}
											reviews={course.reviews}
										/>
									</Link>
								))}
							</div>
						</div>
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};
