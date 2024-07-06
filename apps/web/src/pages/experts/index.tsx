import {Link} from "wouter";
import {useState} from "react";

import {TelegramAd} from "@features/ad";
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
	Icon,
	Input,
} from "@shared/ui";
import {useExperts} from "@entities/expert";
import {ROUTER_PATHS} from "@app/router/paths";

export const ExpertsPage: React.FC = () => {
	const {experts} = useExperts();

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
								<BreadcrumbPage>Эксперты</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section className="bg-gradient py-32 sm:bg-none sm:py-0">
				<Container>
					<div className="flex flex-col items-center space-y-28 sm:hidden">
						<h3 className=" font-bold text-40 text-[#fbfbfb] text-center">
							Эксперты
						</h3>

						<div className="max-w-[72rem] w-full relative">
							<Input
								placeholder="Поиск по экспертам"
								className="!rounded-24 py-16 px-28 !bg-[#fff]"
								value={search}
								onChange={(event) => {
									setSearch(event.currentTarget.value);
								}}
							/>

							<Icon.Magnifier className="absolute right-28 top-1/2 -translate-y-1/2 w-24 h-auto fill-[#b1b1b1]" />
						</div>
					</div>

					<div className="hidden sm:flex justify-between items-center sm:border-b border-[#ddd] sm:pb-8">
						<h3 className="text-44 xs:text-56 font-bold">
							Наши эксперты
						</h3>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex space-x-44 md:flex-col md:space-x-0 md:space-y-44">
						<div className="flex flex-1 flex-col space-y-24">
							{experts
								?.filter((e) => {
									const lcsearch = search.toLowerCase();

									if (lcsearch) {
										return (
											e.firstName
												.toLowerCase()
												.startsWith(lcsearch) ||
											e.lastName
												.toLowerCase()
												.startsWith(
													search.toLowerCase(),
												)
										);
									} else return true;
								})
								.map((expert) => (
									<Link
										key={expert.id}
										to={ROUTER_PATHS.EXPERT.filled(
											expert.id,
										)}
										className="flex bg-[#fff] flex-col shadow-even-sm space-y-24 rounded-18 p-24"
									>
										<div className="flex items-center space-x-24">
											<AvatarWithFallback
												src={expert.avatar}
												text={expert.firstName[0]}
											/>

											<div className="flex flex-col space-y-2 xs:space-y-4">
												<h6 className="text-28 xs:text-30 font-medium leading-[2.4rem] text-[#434343]">
													{expert.firstName}{" "}
													{expert.lastName}
												</h6>
											</div>
										</div>

										<div className="flex items-center space-x-16 text-14">
											<div className="flex items-center space-x-8 xs:space-x-6">
												<Icon.StarOutlined className="size-24 text-[#03c1cd]" />

												<span className="text-[#434343] xs:text-18">
													рейтинг:{" "}
													{expert.rating.toFixed(2)}
												</span>
											</div>

											<div className="flex items-center space-x-8 xs:space-x-6">
												<Icon.Person className="size-24 text-[#03c1cd]" />

												<span className="text-[#434343] xs:text-18">
													студентов: {expert.students}
												</span>
											</div>

											<div className="flex items-center space-x-8 xs:space-x-6">
												<Icon.Video className="size-24 text-[#03c1cd]" />

												<span className="text-[#434343] xs:text-18">
													курсов: {expert.courses}
												</span>
											</div>
										</div>
									</Link>
								))}
						</div>

						<TelegramAd />
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};
