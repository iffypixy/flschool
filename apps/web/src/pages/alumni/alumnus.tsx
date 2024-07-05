import {Link, useParams} from "wouter";

import {
	AvatarWithFallback,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Container,
	ContentTemplate,
} from "@shared/ui";
import {useAlumnus} from "@entities/alumnus";
import {ROUTER_PATHS} from "@app/router/paths";

export const AlumnusPage: React.FC = () => {
	const {alumnusId} = useParams() as {alumnusId: string};
	const {alumnus} = useAlumnus(alumnusId);

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
								<BreadcrumbLink href={ROUTER_PATHS.ALUMNI}>
									Выпускники
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbPage>
									{alumnus?.firstName} {alumnus?.lastName}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-38 xs:space-y-56">
						<h3 className="font-bold text-44 xs:text-56 text-[#000]">
							Истории наших выпускников
						</h3>

						<div className="flex flex-col space-y-36">
							<div className="flex items-center space-x-38 xs:space-x-0 xs:flex-col xs:space-y-16">
								<AvatarWithFallback
									src={alumnus?.avatar}
									text={alumnus?.firstName[0]}
									alt={`Выпускник ${alumnus?.firstName} ${alumnus?.lastName}`}
									className="max-w-[28rem] w-full h-auto rounded-8 xs:max-w-full"
								/>

								<div className="flex flex-col space-y-18 xs:items-center">
									<h5 className="text-32 xs:text-44 font-semibold">
										{alumnus?.firstName} {alumnus?.lastName}
									</h5>

									<div className="flex flex-col space-y-4 text-18 xs:text-22">
										<div className="flex space-x-4">
											<span className="text-[#A6ACB8]">
												Компания:{" "}
											</span>

											<span className="text-[#434343]">
												{alumnus?.workplace}
											</span>
										</div>

										<div className="flex space-x-4">
											<span className="text-[#A6ACB8]">
												Курс:{" "}
											</span>

											<Link
												to={`/courses/${alumnus?.course.id}`}
											>
												<span className="text-primary">
													{alumnus?.course.name}
												</span>
											</Link>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col space-y-16">
								<h6 className="text-24 font-medium xs:text-34">
									О себе
								</h6>

								<p className="xs:text-22">{alumnus?.about}</p>
							</div>

							<div className="flex flex-col space-y-16">
								<h6 className="text-24 font-medium xs:text-34">
									Заработок
								</h6>

								<img
									src={alumnus?.income.url}
									alt="Заработок выпускника"
									className="max-w-[56rem] w-fit h-auto rounded-8 xs:min-w-0 xs:w-full"
								/>
							</div>

							<div className="flex flex-col space-y-16">
								<h6 className="text-24 font-medium xs:text-34">
									Сертификат
								</h6>

								<img
									src={alumnus?.certificate.url}
									alt="Сертификат выпускника"
									className="max-w-[56rem] w-fit h-auto rounded-8 xs:min-w-0 xs:w-full"
								/>
							</div>

							<div className="flex flex-col space-y-16">
								<h6 className="text-24 font-medium xs:text-34">
									Видео-отзыв
								</h6>

								<video
									className="max-w-[56rem] w-fit h-auto rounded-8 xs:min-w-0 xs:w-full"
									src={`${alumnus?.review.url}#t=0.1`}
									controls
								/>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};
