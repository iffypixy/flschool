import {useState} from "react";
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
	Icon,
	Input,
	Logo,
} from "@shared/ui";
import {useLanguageCourses} from "@entities/course";
import {ROUTER_PATHS} from "@app/router/paths";

export const LanguageCoursesPage: React.FC = () => {
	const {courses} = useLanguageCourses();

	const [search, setSearch] = useState("");

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
								<BreadcrumbPage>Языки</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section className="bg-gradient py-32 sm:bg-none sm:py-0">
				<Container>
					<div className="flex flex-col items-center space-y-28 sm:hidden">
						<h3 className="font-bold text-40 text-[#fbfbfb] text-center">
							Языки
						</h3>

						<div className="max-w-[72rem] w-full relative">
							<Input
								value={search}
								onChange={(event) =>
									setSearch(event.currentTarget.value)
								}
								placeholder="Введите название языка"
								className="!rounded-24 py-16 px-28 !bg-[#fff]"
							/>

							<Icon.Magnifier className="absolute right-28 top-1/2 -translate-y-1/2 w-24 h-auto fill-[#b1b1b1]" />
						</div>
					</div>

					<div className="hidden sm:flex justify-between items-center sm:border-b border-[#ddd] sm:pb-8">
						<h3 className="text-44 xs:text-56 font-bold">Языки</h3>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-wrap -m-16 sm:flex-nowrap sm:flex-col">
						{courses
							?.filter((c) =>
								search ? c.name.startsWith(search) : true,
							)
							.map((course) => (
								<Link
									key={course.id}
									to={`/courses/${course.id}`}
									className="w-1/2 p-16 sm:w-full"
								>
									<div className="w-full flex flex-col space-y-24 bg-gradient rounded-24 relative p-30">
										<span className="text-[#fbfbfb] font-bold text-28 xs:text-40">
											{course.name}
										</span>

										<div className="flex flex-col space-y-16">
											<div className="flex flex-wrap -m-4">
												{course.audience.map(
													(a, idx) => (
														<div
															key={idx}
															className="p-4 text-14 xs:text-18"
														>
															<div className="bg-[#d2ecf6] py-4 px-8 rounded-8 text-[#151515]">
																{a}
															</div>
														</div>
													),
												)}
											</div>

											<div className="flex items-center space-x-8 xs:space-x-12">
												<Icon.Dollar className="fill-[#fbfbfb] size-28 xs:size-36" />

												<span className="text-[#FCC648] font-bold text-24 xs:text-28">
													{course.price} KZT
												</span>
											</div>
										</div>

										<div className="flex items-center space-x-12">
											<Logo className="size-44" />

											<span className=" text-18 font-medium text-[#fbfbfb] xs:text-22">
												Freelance school
											</span>
										</div>
									</div>
								</Link>
							))}
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};
