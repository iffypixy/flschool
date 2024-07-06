import {cx} from "class-variance-authority";
import {Link, useParams} from "wouter";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	Container,
	ContentTemplate,
	Icon,
	AvatarWithFallback,
} from "@shared/ui";
import {PaymentModal} from "@features/payment";
import {CourseType, courseTypeToLabel, useCourse} from "@entities/course";
import {ROUTER_PATHS} from "@app/router/paths";
import {languageToLabel} from "@entities/language";
import {LessonsList} from "@entities/lesson";
import {formatPrice} from "@shared/lib/format";

export const CoursePage: React.FC = () => {
	const {courseId} = useParams() as {courseId: string};
	const {course} = useCourse(courseId);

	return (
		<ContentTemplate className="flex flex-col space-y-40 pt-40 pb-96 text-[#434343]">
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
								<BreadcrumbPage>{course?.name}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-32">
						<div className="flex flex-col space-y-12">
							<h3 className="text-36 font-bold xs:text-40">
								{course?.name}
							</h3>

							<div className="flex items-center space-x-26 font-medium">
								<div className="flex items-center space-x-10">
									<Icon.Star className="fill-[#fcc648] size-24 xs:size-28" />

									<span className="xs:text-22">
										{course?.rating.toFixed(2)}

										<span className="text-[#909090] text-14 xs:text-20 ml-6">
											(оценок: {course?.reviews})
										</span>
									</span>
								</div>

								<div className="flex items-center space-x-10">
									<Icon.Globe className="text-[#434343] size-24 xs:size-28" />

									<span className="xs:text-22">
										Язык курса:{" "}
										{course?.language &&
											languageToLabel(course?.language)}
									</span>
								</div>
							</div>
						</div>

						{/* if user has the course purchased */}
						{course?.isEnrolled && (
							<div className="flex flex-col space-y-18 max-w-full w-full">
								<div className="flex flex-col space-y-10">
									<div className="flex items-center justify-between text-20 xs:text-28">
										<div className="flex items-center space-x-4">
											<span className="font-bold">
												{course?.progress}/
												{course?.lessons.length}
											</span>

											<span className="text-[#909090]">
												уроков
											</span>
										</div>

										{!!course?.progress && (
											<span className="font-bold">
												{Math.floor(
													(course.progress /
														(course?.lessons
															.length || 1)) *
														100,
												)}
												%
											</span>
										)}
									</div>

									<div className="bg-[#1b998b33] w-full rounded-10 h-16">
										{!!course?.progress && (
											<div
												style={{
													width: `${Math.floor(
														(course.progress /
															course?.lessons
																.length) *
															100,
													)}%`,
												}}
												className="h-full bg-[#03c1cd] rounded-10"
											/>
										)}
									</div>
								</div>

								{course.currentLessonId && (
									<Link
										to={`/courses/${course.id}/lessons/${course.currentLessonId}`}
										className="w-full"
									>
										<Button className="bg-[#03c1cd] w-full text-[#fbfbfb] py-18 text-18 xs:text-26">
											Продолжить обучение
										</Button>
									</Link>
								)}
							</div>
						)}

						<div className="flex md:flex-col-reverse">
							<div className="flex flex-1 flex-col space-y-24 md:mt-32">
								{course && (
									<video
										className="w-full h-auto rounded-12"
										controls
										src={`${course?.preview}#t=0.1`}
										preload="metadata"
									/>
								)}

								<p className="font-medium xs:text-22">
									{course?.description}
								</p>
							</div>

							{!course?.isEnrolled && (
								<div className="max-w-[36rem] w-full flex flex-col space-y-24 md:max-w-full ml-32 md:ml-0">
									<div className="flex flex-col items-center bg-[#fff] rounded-16 shadow-even-sm p-28">
										<h5 className="text-36 font-semibold xs:text-48">
											{course?.price &&
												formatPrice(course.price)}{" "}
											₸
										</h5>

										<span className="text-24 text-[#03C1CD] xs:text-32">
											за полный пакет
										</span>
									</div>

									<PaymentModal>
										<Button className="bg-gradient text-[#fbfbfb] shadow-primary/30 shadow-border-md py-18 w-[calc(100%-12px)] mx-auto xs:text-28">
											Купить{" "}
											{course &&
												(course.type ===
												CourseType.LANGUAGE
													? "курс"
													: `набор "${courseTypeToLabel(course.type)}"`)}
										</Button>
									</PaymentModal>
								</div>
							)}
						</div>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-38">
						<h5 className="text-32 font-semibold xs:text-40">
							Для кого этот курс:
						</h5>

						<div className="flex flex-col space-y-32 text-[#151515]">
							{course?.audience.map((a, idx) => (
								<div
									key={idx}
									className="flex items-center space-x-12"
								>
									<Icon.CheckRounded className="min-w-24 max-w-24 w-24 h-24 min-h-24 max-h-24 xs:min-h-30 xs:min-w-30 xs:max-w-30 xs:max-h-30 xs:w-30 xs:h-30 text-primary" />

									<p className="font-medium text-18 xs:text-24">
										{a}
									</p>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-38">
						<h5 className="text-32 font-semibold xs:text-40">
							Эксперт
						</h5>

						<div className="flex flex-col space-y-22">
							<Link
								to={`/experts/${course?.author.id}`}
								className="flex items-center space-x-18"
							>
								<AvatarWithFallback
									src={course?.author.avatar}
									text={course?.author.firstName[0]}
								/>

								<span className="text-24 font-medium xs:text-32">
									{course?.author.firstName}{" "}
									{course?.author.lastName}
								</span>
							</Link>

							<div className="flex items-center space-x-18 text-18 xs:text-22">
								<div className="flex items-center space-x-8">
									<Icon.StarOutlined className="size-24 text-[#03c1cd]" />

									<span className="text-[#434343]">
										рейтинг:{" "}
										{course?.author.rating.toFixed(2)}
									</span>
								</div>

								<div className="flex items-center space-x-8">
									<Icon.Person className="size-24 text-[#03c1cd]" />

									<span className="text-[#434343]">
										студентов: {course?.author.students}
									</span>
								</div>

								<div className="flex items-center space-x-8">
									<Icon.Video className="size-24 text-[#03c1cd]" />

									<span className="text-[#434343]">
										курсов: {course?.author.courses}
									</span>
								</div>
							</div>

							<p className="xs:text-20">{course?.author.about}</p>
						</div>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-38">
						<h5 className="text-32 font-semibold xs:text-40">
							Программа курса
						</h5>

						{course && (
							<LessonsList
								courseId={course.id}
								lessons={course.lessons}
								isEnrolled={course.isEnrolled}
								progress={course.progress || 0}
							/>
						)}
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-38">
						<h5 className="text-32 font-semibold xs:text-40">
							Отзывы студентов
						</h5>

						<div className="flex flex-wrap items-center text-center md:justify-center -m-8">
							<div className="min-w-[26rem] bg-[#fff] flex flex-col p-24 space-y-2 m-8 rounded-12 shadow-even-sm">
								<span className="text-20 xs:text-26 text-[#909090]">
									Рейтинг курса
								</span>

								<span className="text-[#03c1cd] font-bold text-24 xs:text-30">
									{course?.rating.toFixed(2)}
								</span>
							</div>

							<div className="min-w-[26rem] bg-[#fff] flex flex-col p-24 space-y-2 m-8 rounded-12 shadow-even-sm">
								<span className="text-20 xs:text-26 text-[#909090]">
									Количество отзывов
								</span>

								<span className="text-[#03c1cd] font-bold text-24 xs:text-30">
									{course?.reviews}
								</span>
							</div>

							<div className="min-w-[26rem] bg-[#fff] flex flex-col p-24 space-y-2 m-8 rounded-12 shadow-even-sm">
								<span className="text-20 xs:text-26 text-[#909090]">
									Положительные отзывы
								</span>

								<span className="text-[#03c1cd] font-bold text-24 xs:text-30">
									{course?.positiveReviews}
								</span>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};
