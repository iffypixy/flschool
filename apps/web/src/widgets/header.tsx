import {Link} from "wouter";

import {
	Button,
	Container,
	Logo,
	Modal,
	ModalContent,
	ModalTrigger,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	Hidden,
	AvatarWithFallback,
	Separator,
	SheetClose,
	Icon,
} from "@shared/ui";
import {useViewer} from "@entities/viewer";
import {useLogout} from "@features/auth";
import {Branch} from "@shared/lib/branch";
import {ROUTER_PATHS} from "@app/router/paths";

export const Header: React.FC = () => {
	const {viewer, isAuthenticated} = useViewer();

	const {logout} = useLogout();

	return (
		<header>
			<Container>
				<div className="flex justify-between items-center py-18">
					<Link to="/">
						<Logo />
					</Link>

					<nav className="md:hidden">
						<ul className="flex items-center space-x-28 font-medium text-18 text-[#151515]">
							{[
								{
									path: ROUTER_PATHS.FREELANCE_TEENS_COURSES,
									label: "Freelance teens",
								},
								{
									path: ROUTER_PATHS.EDUCATION_COURSES,
									label: "Образование",
								},
								{
									path: ROUTER_PATHS.LANGUAGE_COURSES,
									label: "Языки",
								},
								{
									path: ROUTER_PATHS.EXPERTS,
									label: "Эксперты",
								},
								{
									path: ROUTER_PATHS.ALUMNI,
									label: "Выпускники",
								},
								{
									path: ROUTER_PATHS.VACANCIES,
									label: "Вакансии",
								},
							].map(({path, label}) => (
								<li key={path}>
									<Link to={path}>{label}</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className="flex items-center space-x-24 md:hidden">
						<Branch if={isAuthenticated}>
							<Link
								to={ROUTER_PATHS.PROFILE}
								className="flex items-center space-x-12"
							>
								<AvatarWithFallback
									src={viewer?.avatar}
									alt="Аватар"
									text={viewer?.firstName[0]}
								/>

								<span className="text-24 font-bold underline">
									{viewer?.firstName}
								</span>
							</Link>

							<>
								{/* <SelectLanguageModal /> */}

								<Link to={ROUTER_PATHS.SIGN_IN}>
									<Button>Войти</Button>
								</Link>
							</>
						</Branch>
					</div>

					<Sheet>
						<SheetTrigger className="hidden md:flex">
							<span className="flex flex-col space-y-6 w-48">
								{Array.from({length: 3}).map((_, idx) => (
									<span
										key={idx}
										className="w-full h-6 bg-primary rounded-2"
									/>
								))}
							</span>
						</SheetTrigger>

						<SheetContent className="py-24">
							<Hidden>
								<SheetHeader>
									<SheetTitle>Navigation bar</SheetTitle>

									<SheetDescription>
										Helps find needed link or button.
									</SheetDescription>
								</SheetHeader>
							</Hidden>

							<div className="flex flex-col space-y-24 text-[#434343]">
								<div className="flex items-center justify-between">
									<Branch if={isAuthenticated}>
										<Link
											to="/profile"
											className="flex items-center space-x-18"
										>
											<AvatarWithFallback
												src={viewer?.avatar}
												alt="Аватар"
												text={viewer?.firstName[0]}
												className="!size-60"
											/>

											<span className="text-30 font-medium">
												{viewer?.firstName}
											</span>
										</Link>

										<Link
											to="/sign-in"
											className="text-primary underline underline-offset-2 text-28"
										>
											Войти
										</Link>
									</Branch>

									<div className="flex items-center space-x-18">
										{/* <SelectLanguageModal /> */}

										<SheetClose>
											<Icon.Cross className="fill-[#434343] w-18 h-auto" />
										</SheetClose>
									</div>
								</div>

								<Separator />

								<nav>
									<ul className="flex flex-col space-y-24 font-normal text-22">
										{isAuthenticated ? (
											<>
												<li>
													<Link
														to={
															ROUTER_PATHS.PROFILE
														}
														className="flex items-center gap-16 text-[#61677F]"
													>
														<Icon.Nav.Person className="w-24 h-auto" />

														<span>Профиль</span>
													</Link>
												</li>

												<li>
													<Link
														to={ROUTER_PATHS.HOME}
														className="flex items-center gap-16 text-[#61677F]"
													>
														<Icon.Nav.Courses className="w-24 h-auto" />

														<span>Мои курсы</span>
													</Link>
												</li>
											</>
										) : (
											<li>
												<Link
													to={ROUTER_PATHS.HOME}
													className="flex items-center gap-16 text-[#61677F]"
												>
													<Icon.Nav.Person className="w-24 h-auto" />

													<span>Главная</span>
												</Link>
											</li>
										)}

										{[
											{
												icon: (
													<Icon.Nav.FlTeens className="w-26 h-auto text-[#434343]" />
												),
												path: ROUTER_PATHS.FREELANCE_TEENS_COURSES,
												label: "Freelance teens",
											},
											{
												icon: (
													<Icon.Nav.Education className="w-26 h-auto text-[#434343]" />
												),
												path: ROUTER_PATHS.EDUCATION_COURSES,
												label: "Образование",
											},
											{
												icon: (
													<Icon.Nav.Language className="w-26 h-auto text-[#434343]" />
												),
												path: ROUTER_PATHS.LANGUAGE_COURSES,
												label: "Языки",
											},
											{
												icon: (
													<Icon.Nav.Expert className="w-26 h-auto text-[#434343]" />
												),
												path: ROUTER_PATHS.EXPERTS,
												label: "Эксперты",
											},
											{
												icon: (
													<Icon.Admin.Alumni className="w-26 h-auto text-[#434343]" />
												),
												path: ROUTER_PATHS.ALUMNI,
												label: "Выпускники",
											},
											{
												icon: (
													<Icon.Nav.Vacancy className="w-26 h-auto text-[#434343]" />
												),
												path: ROUTER_PATHS.VACANCIES,
												label: "Вакансии",
											},
										].map(({icon, path, label}) => (
											<li key={path}>
												<Link
													to={path}
													className="flex items-center gap-16"
												>
													{icon}

													<span>{label}</span>
												</Link>
											</li>
										))}

										{isAuthenticated && (
											<li>
												<button
													onClick={() => {
														logout();
													}}
													className="flex items-center gap-16"
												>
													<Icon.Nav.Exit className="w-26 h-auto text-primary" />

													<span className="text-primary">
														Выход
													</span>
												</button>
											</li>
										)}
									</ul>
								</nav>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</Container>
		</header>
	);
};

const SelectLanguageModal: React.FC = () => {
	return (
		<Modal>
			<ModalTrigger className="w-fit">
				<span className="inline-flex text-[#434343] font-medium text-[1.4rem] underline underline-offset-2 md:text-28">
					RU
				</span>
			</ModalTrigger>

			<ModalContent
				className="flex flex-col space-y-24 border text-[#434343]"
				showClose
			>
				<div className="flex flex-col space-y-2">
					<h3 className="font-bold text-26 xs:text-44">
						Выберите язык
					</h3>

					<span className="xs:text-24">
						Выбранный вами язык сохранится при дальнейшей работе
					</span>
				</div>

				<div className="flex flex-col space-y-14">
					{[
						{id: "ru", label: "Русский"},
						{id: "kz", label: "Қазақ"},
						{id: "gb", label: "English"},
					].map((lang) => (
						<button
							key={lang.id}
							className="flex items-center justify-center space-x-12 p-24 rounded-8 border-2 border-[#eee] text-20"
						>
							<img
								src={`https://flagcdn.com/${lang.id}.svg`}
								alt="Флаг страны языка"
								className="w-32 h-auto xs:w-40 border border-[#434343]"
							></img>

							<span className="xs:text-24">{lang.label}</span>
						</button>
					))}
				</div>
			</ModalContent>
		</Modal>
	);
};
