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
	AvatarWithFallback,
} from "@shared/ui";
import {useAlumni} from "@entities/alumnus";
import {ROUTER_PATHS} from "@app/router/paths";

export const AlumniPage: React.FC = () => {
	const {alumni} = useAlumni();

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
								<BreadcrumbPage>Выпускники</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-38">
						<h3 className="font-bold text-44 xs:text-56 text-[#000]">
							Истории наших выпускников
						</h3>

						<div className="flex flex-wrap -m-24 xs:m-0 xs:flex-col">
							{alumni?.map((alumnus) => (
								<Link
									key={alumnus.id}
									to={`/alumni/${alumnus.id}`}
									className="w-1/4 p-24 lg:w-1/3 sm:w-1/2 xs:w-full xs:py-28 xs:px-0"
								>
									<div className="flex flex-col space-y-10">
										<AvatarWithFallback
											src={alumnus.avatar}
											text={alumnus.firstName[0]}
											alt="Выпускник"
											className="max-w-full h-auto bg-transparent"
										/>

										<div className="flex flex-col space-y-8">
											<h5 className="text-22 xs:text-38 text-[#434343] font-semibold sm:text-28">
												{alumnus.firstName}{" "}
												{alumnus.lastName}
											</h5>

											<div className="flex flex-col space-y-2 sm:text-20 xs:text-26">
												<div className="flex space-x-4">
													<span className="text-[#A6ACB8]">
														Компания:{" "}
													</span>

													<span className="text-[#434343]">
														{alumnus.workplace}
													</span>
												</div>

												<div className="flex space-x-4">
													<span className="text-[#A6ACB8]">
														Курс:{" "}
													</span>

													<Link
														to={`/courses/${alumnus.course.id}`}
													>
														<span className="text-primary">
															{
																alumnus.course
																	.name
															}
														</span>
													</Link>
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};
