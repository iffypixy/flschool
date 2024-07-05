import {cx} from "class-variance-authority";
import {Controller, useForm} from "react-hook-form";
import {useParams} from "wouter";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	Center,
	Container,
	ContentTemplate,
	Fullscreen,
	Icon,
	Loader,
} from "@shared/ui";
import {Branch} from "@shared/lib/branch";
import {ROUTER_PATHS} from "@app/router/paths";
import {useCourseCertificate, useReviewCourse} from "@entities/course";

export const CertificatePage: React.FC = () => {
	const {courseId} = useParams() as {courseId: string};
	const {
		certificate,
		isReviewed,
		isLoading,
		refetch: refetchCertificate,
	} = useCourseCertificate(courseId);

	const {register, control, handleSubmit, formState} = useForm<{
		courseComment: string;
		courseRating: number;
		expertComment: string;
		expertRating: number;
	}>({});

	const {reviewCourse} = useReviewCourse();

	if (isLoading)
		return (
			<Fullscreen>
				<Center>
					<Loader />
				</Center>
			</Fullscreen>
		);

	return (
		<ContentTemplate className="flex flex-col space-y-68">
			<section>
				<Container>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href={ROUTER_PATHS.HOME}>
									Мои курсы
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbPage>
									Скачать сертификат
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section>
				<Container>
					<Branch if={!!(isReviewed && certificate)}>
						<Certificate link={certificate!} />

						<div className="flex flex-col items-center space-y-60">
							<h3 className="text-[#434343] font-bold text-24 xs:text-32 text-center">
								После заполнения формы вы сможете скачать свой
								сертификат. Спасибо за ваш вклад!
							</h3>

							<form
								onSubmit={handleSubmit((form) => {
									reviewCourse({
										id: courseId,
										rating: form.courseRating,
										comment: form.courseComment,
										expertRating: form.expertRating,
										expertComment: form.courseComment,
									}).then(() => {
										refetchCertificate();
									});
								})}
								className="flex flex-col space-y-24 max-w-[76rem] w-full"
							>
								<div className="flex flex-col space-y-44 rounded-12 p-38 shadow-even-sm">
									<div className="flex flex-col space-y-24">
										<h5 className="font-medium text-22 xs:text-28">
											1. Оцените общий уровень
											удовлетворенности курсом
										</h5>

										<Controller
											name="courseRating"
											control={control}
											rules={{required: true}}
											render={({field}) => (
												<div className="flex items-center space-x-10 mx-auto">
													{[1, 2, 3, 4, 5].map(
														(rate) => (
															<button
																key={rate}
																type="button"
																onClick={() => {
																	field.onChange(
																		rate,
																	);
																}}
																className="group"
															>
																<Icon.StarOutlined
																	className={cx(
																		"w-44 h-auto text-[#03C1CD] group-hover:fill-[#03C1CD] transition-all duration-300",
																		{
																			"fill-[#03C1CD]":
																				(field.value ||
																					0) >=
																				rate,
																		},
																	)}
																/>
															</button>
														),
													)}
												</div>
											)}
										/>
									</div>

									<div className="flex flex-col space-y-24">
										<h5 className="font-medium text-22 xs:text-28">
											2. Поделитесь своими предложениями
											по улучшению курса и любыми другими
											комментариями
										</h5>

										<textarea
											{...register("courseComment", {
												required: true,
											})}
											placeholder="Оставьте комментарий"
											className="resize-none p-12 min-h-[16rem] border border-[#ccc] rounded-8 bg-transparent xs:placeholder:text-24 xs:text-26"
										/>
									</div>

									<div className="flex flex-col space-y-24">
										<h5 className="font-medium text-22 xs:text-28">
											3. Оцените компетентность эксперта
										</h5>

										<Controller
											name="expertRating"
											control={control}
											rules={{required: true}}
											render={({field}) => (
												<div className="flex items-center space-x-10 mx-auto">
													{[1, 2, 3, 4, 5].map(
														(rate) => (
															<button
																key={rate}
																type="button"
																onClick={() => {
																	field.onChange(
																		rate,
																	);
																}}
																className="group"
															>
																<Icon.StarOutlined
																	className={cx(
																		"w-44 h-auto text-[#03C1CD] group-hover:fill-[#03C1CD]",
																		{
																			"fill-[#03C1CD]":
																				(field.value ||
																					0) >=
																				rate,
																		},
																	)}
																/>
															</button>
														),
													)}
												</div>
											)}
										/>
									</div>

									<div className="flex flex-col space-y-24">
										<h5 className="font-medium text-22 xs:text-28">
											4. Какие аспекты преподавания
											эксперта вам понравились больше
											всего? Что бы вы предложили улучшить
											в работе эксперта?
										</h5>

										<textarea
											{...register("expertComment", {
												required: true,
											})}
											placeholder="Оставьте комментарий"
											className="resize-none p-12 min-h-[16rem] border border-[#ccc] rounded-8 bg-transparent xs:placeholder:text-24 xs:text-26"
										/>
									</div>
								</div>

								<Button
									disabled={!formState.isValid}
									className="bg-gradient py-18 text-20 w-full sm:w-full mx-auto xs:text-28"
								>
									Отправить
								</Button>
							</form>
						</div>
					</Branch>
				</Container>
			</section>
		</ContentTemplate>
	);
};

const Certificate: React.FC<{link: string}> = ({link}) => {
	return (
		<div className="flex flex-col items-center space-y-32">
			<h3 className="text-[#434343] font-bold text-24 text-center">
				Поздравляем с завершением курса!
			</h3>

			<div className="flex flex-col space-y-24">
				<a href={link} target="_blank">
					<Button className="py-18 text-20 bg-gradient">
						Скачать сертификат
					</Button>
				</a>
			</div>
		</div>
	);
};
