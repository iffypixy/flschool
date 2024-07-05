import * as RXTabs from "@radix-ui/react-tabs";
import {cx} from "class-variance-authority";
import {Link} from "wouter";

import {Button, Container, ContentTemplate, Icon, Swiper} from "@shared/ui";
import banner1 from "@shared/assets/banner-1.png";
import banner2 from "@shared/assets/banner-2.png";
import courseimg from "@shared/assets/course.png";
import checked from "@shared/assets/checked.png";
import {ROUTER_PATHS} from "@app/router/paths";
import {useMyCourses} from "@entities/profile";
import {usePopularCourses} from "@entities/course";

enum Tab {
	IN_PROGRESS,
	COMPLETED,
}

export const PrivateHomePage: React.FC = () => {
	const {courses} = useMyCourses();

	const {courses: popularCourses} = usePopularCourses();

	return (
		<ContentTemplate className="flex flex-col space-y-40">
			<section>
				<Container>
					<div className="flex flex-col space-y-34">
						<h3 className="text-36 font-bold xs:text-56">
							Мои курсы
						</h3>

						<RXTabs.Root
							defaultValue={String(Tab.IN_PROGRESS)}
							className="flex flex-col space-y-24"
						>
							<RXTabs.List className="font-medium space-x-12">
								{[
									{
										id: Tab.IN_PROGRESS,
										label: "В прогрессе",
									},
									{
										id: Tab.COMPLETED,
										label: "Завершенные",
									},
								].map((trigger) => (
									<RXTabs.Trigger
										key={trigger.id}
										value={String(trigger.id)}
										className={cx(
											"py-8 px-16 rounded-8 xs:text-24 xs:px-24 text-center border border-[#03c1cd] data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-[#fff] transition-colors duration-300",
										)}
									>
										<span>{trigger.label}</span>
									</RXTabs.Trigger>
								))}
							</RXTabs.List>

							<RXTabs.Content value={String(Tab.IN_PROGRESS)}>
								<div className="flex flex-wrap -m-16 sm:flex-col">
									{courses?.inProgress.map((course) => (
										<Link
											key={course.id}
											to={ROUTER_PATHS.COURSE.filled(
												course.id,
											)}
											className="w-1/2 p-16 sm:w-full"
										>
											<div className="flex flex-col justify-between min-h-[32rem] bg-[#fff] shadow-even-sm p-24 rounded-24">
												<h5 className="font-medium text-28 xs:text-34">
													{course.name}
												</h5>

												<div className="flex flex-col space-y-10">
													<div className="flex items-center justify-between text-20 xs:text-26">
														<div className="flex items-center space-x-4">
															<span className="font-bold">
																{
																	course.progress
																}
																/
																{course.lessons}
															</span>

															<span className="text-[#909090]">
																уроков
															</span>
														</div>

														<span className="font-bold">
															{Math.floor(
																(course.progress /
																	(course.lessons ||
																		1)) *
																	100,
															)}
															%
														</span>
													</div>

													<div className="bg-[#1b998b33] w-full rounded-10 h-18">
														<div
															style={{
																width: `${(course.progress / (course.lessons || 1)) * 100}%`,
															}}
															className="h-full bg-[#03c1cd] rounded-10"
														/>
													</div>
												</div>

												<Button className="bg-[#03C1CD] text-[#fbfbfb] py-16 !text-22 xs:text-26">
													Продолжить обучение
												</Button>
											</div>
										</Link>
									))}

									{courses?.inProgress.length === 0 && (
										<h5 className="text-24 font-semibold m-16 text-[#434343]">
											Нет курсов в прогрессе.
										</h5>
									)}
								</div>
							</RXTabs.Content>

							<RXTabs.Content value={String(Tab.COMPLETED)}>
								<div className="flex flex-wrap -m-16 sm:flex-col">
									{courses?.completed.map((course) => (
										<div
											key={course.id}
											className="w-1/2 p-16 sm:w-full"
										>
											<div className="flex flex-col justify-between min-h-[32rem] bg-[#fff] shadow-even-sm p-24 rounded-24">
												<div className="flex items-center space-x-12">
													<img
														src={checked}
														alt="Галочка"
														className="w-44 h-auto"
													/>

													<h5 className="font-medium text-28 xs:text-34">
														{course.name}
													</h5>
												</div>

												<div className="flex flex-col space-y-10">
													<div className="flex items-center justify-between text-20 xs:text-26">
														<div className="flex items-center space-x-4">
															<span className="font-bold">
																{course.lessons}
																/
																{course.lessons}
															</span>

															<span className="text-[#909090]">
																уроков
															</span>
														</div>

														<span className="font-bold">
															100%
														</span>
													</div>

													<div className="bg-[#1b998b33] w-full rounded-10 h-18">
														<div className="w-[100%] h-full bg-[#03c1cd] rounded-10" />
													</div>
												</div>

												<Link
													to={ROUTER_PATHS.COURSE_CERTIFICATE.filled(
														course.id,
													)}
													className="w-full"
												>
													<Button className="bg-gradient text-[#fbfbfb] py-16 !text-22 w-full xs:text-26">
														Скачать сертификат
													</Button>
												</Link>
											</div>
										</div>
									))}

									{courses?.completed.length === 0 && (
										<h5 className="text-24 font-semibold m-16 text-[#434343]">
											Нет завершенных курсов.
										</h5>
									)}
								</div>
							</RXTabs.Content>
						</RXTabs.Root>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-18">
						<h4 className="text-28 font-bold">
							Новости и обновления
						</h4>

						<Swiper
							slidesToShow={2}
							infinite
							dots
							arrows={false}
							responsive={[
								{
									breakpoint: 768,
									settings: {
										slidesToShow: 1,
									},
								},
							]}
							className="flex -m-16"
						>
							{[
								{
									label: "Пригласи друга и получи скидку на обучение!",
									img: banner1,
								},
								{
									label: "Скачай сертификат по завершению курса в личном кабинете.",
									img: banner2,
								},
							].map((banner, idx) => (
								<div key={idx} className="w-1/2 p-16 sm:w-full">
									<div className="flex items-center justify-between bg-gradient h-[32rem] md:h-[26rem] rounded-[3.2rem] p-28">
										<span className="text-22 font-medium text-[#fff] md:text-18 sm:text-26 xs:text-20">
											{banner.label}
										</span>

										<img
											src={banner.img}
											alt="Баннер 1"
											className="max-w-[24rem] w-full h-auto md:max-w-[20rem] sm:max-w-[22rem] xs:max-w-[18rem]"
										/>
									</div>
								</div>
							))}
						</Swiper>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-18">
						<div className="flex items-center justify-between">
							<h4 className="text-28 font-bold">
								Популярные курсы
							</h4>

							<Link to={ROUTER_PATHS.EDUCATION_COURSES}>
								<span className="text-[#03c1cd] text-18 underline underline-offset-2">
									Посмотреть все
								</span>
							</Link>
						</div>

						<div className="flex -m-16 sm:flex-col">
							{popularCourses?.map((c) => (
								<div
									key={c.id}
									className="w-1/2 p-16 sm:w-full"
								>
									<div className="flex justify-between items-center border border-[#D9D9D9] rounded-16 p-24">
										<div className="flex space-x-16 items-center">
											<img
												src={courseimg}
												alt="Курс"
												className="w-[6rem] h-auto"
											/>

											<div className="flex flex-col text-[#000]">
												<h6 className="font-semibold text-26">
													{c.name}
												</h6>

												<span>{c.lessons} уроков</span>
											</div>
										</div>

										<Link
											to={ROUTER_PATHS.COURSE.filled(
												c.id,
											)}
										>
											<Icon.Arrow.Right className="fill-[#03c1cd] w-38 h-auto" />
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};
