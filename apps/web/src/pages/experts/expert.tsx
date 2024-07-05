import {useParams} from "wouter";

import {TelegramAd} from "@features/ad";
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
	AvatarWithFallback,
	Separator,
} from "@shared/ui";
import {useExpert} from "@entities/expert";
import {ROUTER_PATHS} from "@app/router/paths";

export const ExpertPage: React.FC = () => {
	const {expertId} = useParams() as {expertId: string};
	const {expert} = useExpert(expertId);

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
								<BreadcrumbLink href={ROUTER_PATHS.EXPERTS}>
									Эксперты
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator />

							<BreadcrumbItem>
								<BreadcrumbPage>
									{expert?.firstName} {expert?.lastName}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex space-x-44 md:flex-col md:space-x-0 md:space-y-28">
						<div className="flex flex-1 flex-col space-y-32 p-28 rounded-12 shadow-even-sm bg-[#fff]">
							<div className="flex items-center space-x-18">
								<AvatarWithFallback
									src={expert?.avatar}
									text={expert?.firstName[0]}
									alt="Эксперт"
								/>

								<span className="text-32 xs:text-36 font-bold">
									{expert?.firstName} {expert?.lastName}
								</span>
							</div>

							<Separator />

							<div className="flex flex-col space-y-20">
								<h6 className="font-medium text-24 xs:text-28">
									Обо мне
								</h6>

								<div className="flex flex-col space-y-14">
									<div className="flex items-center space-x-16 xs:text-20">
										<div className="flex items-center space-x-8">
											<Icon.StarOutlined className="size-24 text-[#03c1cd]" />

											<span className="text-[#434343]">
												рейтинг:{" "}
												{expert?.rating.toFixed(2)}
											</span>
										</div>

										<div className="flex items-center space-x-8">
											<Icon.Person className="size-24 text-[#03c1cd]" />

											<span className="text-[#434343]">
												студентов: {expert?.students}
											</span>
										</div>

										<div className="flex items-center space-x-8">
											<Icon.Video className="size-24 text-[#03c1cd]" />

											<span className="text-[#434343]">
												курсов: {expert?.courses}
											</span>
										</div>
									</div>

									<p className="xs:text-20">
										{expert?.about}
									</p>
								</div>
							</div>
						</div>

						<TelegramAd />
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};
