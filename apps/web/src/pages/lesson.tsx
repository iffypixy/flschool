import {useEffect, useState} from "react";
import {Link, useParams} from "wouter";
import {cx} from "class-variance-authority";

import {
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
} from "@shared/ui";
import {
	HomeworkAnswerFeedback,
	HomeworkTest,
	HomeworkText,
	LessonsList,
	useLesson,
	useReviewLesson,
} from "@entities/lesson";
import {
	HomeworkAnswerStatus,
	HomeworkType,
	homeworkStatusToLabel,
} from "@entities/homework";
import {ROUTER_PATHS} from "@app/router/paths";

export const LessonPage: React.FC = () => {
	const {courseId, lessonId} = useParams() as {
		courseId: string;
		lessonId: string;
	};

	const {lesson} = useLesson({courseId, lessonId});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [courseId, lessonId]);

	const statusIcon =
		lesson?.homework.answer &&
		(
			{
				APPROVED: <Icon.Check className="w-14 h-auto fill-green-600" />,
				FAILED: <Icon.Cross className="w-12 h-auto fill-red-600" />,
				PENDING: <Icon.Clock className="w-14 h-auto fill-[#434343]" />,
			} as Record<HomeworkAnswerStatus, React.ReactNode>
		)[lesson.homework.answer.status];

	return (
		<ContentTemplate className="flex flex-col space-y-40 pt-40 pb-96">
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
								<BreadcrumbLink
									href={ROUTER_PATHS.COURSE.filled(courseId)}
								>
									{lesson?.course.name}
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbPage>
									Урок {(lesson?.order || 0) + 1}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-40">
						<div className="flex flex-col space-y-32">
							<h3 className="text-36 font-bold xs:text-44">
								{lesson?.name}
							</h3>

							{lesson && (
								<video
									className="w-full h-auto rounded-12"
									src={`${lesson?.video}#t=0.1`}
									controls
									preload="metadata"
								/>
							)}
						</div>

						<h5 className="text-26 font-medium space-x-12 xs:text-34">
							<span>Урок {(lesson?.order || 0) + 1}</span>

							<span>|</span>

							<span>{lesson?.name}</span>
						</h5>

						<div className="flex flex-col space-y-32 max-w-[92rem] w-full">
							<div className="flex flex-col space-y-24">
								<h5 className="text-26 font-medium xs:text-34">
									Домашнее задание
								</h5>

								<div className="flex flex-col">
									{lesson &&
										(lesson.homework.type ===
										HomeworkType.TEST ? (
											<HomeworkTest
												status={
													lesson.homework.answer
														?.status
												}
												answer={
													lesson.homework.answer
														?.submittedTest
												}
												question={lesson.homework.test!}
											/>
										) : (
											<HomeworkText
												status={
													lesson.homework.answer
														?.status
												}
												answer={
													lesson.homework.answer && {
														file: lesson.homework
															.answer.file,
														text: lesson.homework
															.answer.text,
													}
												}
												question={lesson.homework.text!}
											/>
										))}

									<div className="flex items-center justify-between mt-24">
										{lesson?.homework.answer && (
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-8">
													{statusIcon}

													<span className="text-[#434343] text-sm">
														{homeworkStatusToLabel(
															lesson.homework
																.answer.status,
														)}
													</span>
												</div>
											</div>
										)}

										{lesson?.homework.answer?.feedback && (
											<HomeworkAnswerFeedback
												feedback={
													lesson.homework.answer
														.feedback
												}
											>
												<span className="underline">
													Посмотреть ответ
												</span>
											</HomeworkAnswerFeedback>
										)}
									</div>
								</div>
							</div>

							{lesson && (
								<div className="flex flex-col space-y-28">
									{!lesson.isReviewed && <RateLesson />}

									{lesson.course.lessons.length >
										lesson.order + 1 && (
										<Link
											to={ROUTER_PATHS.LESSON.filled(
												lesson.course.id,
												lesson.course.lessons[
													lesson.order + 1
												].id,
											)}
										>
											<Button
												disabled={
													!(
														lesson.course.progress >
														lesson.order
													)
												}
												className="w-full py-18 text-20 xs:text-24"
											>
												Следующий урок
											</Button>
										</Link>
									)}
								</div>
							)}

							{lesson && (
								<LessonsList
									courseId={lesson.course.id}
									lessons={lesson.course.lessons}
									progress={lesson.course.progress}
									isEnrolled
								/>
							)}
						</div>
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};

const RateLesson: React.FC = () => {
	const {courseId, lessonId} = useParams() as {
		courseId: string;
		lessonId: string;
	};

	const [visible, setVisible] = useState(true);
	const [open, setOpen] = useState(true);

	const [rating, setRating] = useState(0);

	const {reviewLesson} = useReviewLesson();

	if (!visible) return null;

	return (
		<div
			className={cx(
				"flex flex-col space-y-16 items-center duration-300",
				{
					"animate-out fade-out-0": !open,
				},
			)}
		>
			<h6 className="font-medium text-22 xs:text-32">Оцените урок</h6>

			<div className="flex items-center space-x-10">
				{[1, 2, 3, 4, 5].map((rate) => (
					<button
						key={rate}
						onClick={() => {
							reviewLesson({
								courseId,
								lessonId,
								rating: rate,
							});

							setRating(rate);
							setTimeout(() => {
								setVisible(false);
							}, 300);

							setOpen(false);

							/** @todo submit lesson review */
						}}
						className="group"
					>
						<Icon.StarOutlined
							className={cx(
								"w-32 xs:w-48 h-auto group-hover:text-[#FCC648]",
								{
									"text-[#FCC648] fill-[#FCC648]":
										rating >= rate,
								},
							)}
						/>
					</button>
				))}
			</div>
		</div>
	);
};
