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
} from "@shared/ui";
import {useViewer, viewerQueryKeys} from "@entities/viewer";
import {useLogout} from "@features/auth";
import {Branch} from "@shared/lib/branch";
import {queryClient} from "@app/query-client";
import {GetViewerDto} from "@entities/viewer/api";
import {MaybeObject} from "@shared/lib/types";
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
								<SelectLanguageModal />

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
									<SelectLanguageModal />

									<Branch if={isAuthenticated}>
										<Link
											to="/profile"
											className="flex items-center space-x-24"
										>
											<AvatarWithFallback
												src={viewer?.avatar}
												alt="Аватар"
												text={viewer?.firstName[0]}
											/>

											<span className="text-32 font-bold underline">
												{viewer?.firstName}
											</span>
										</Link>

										<Link to="/sign-in">
											<Button className="sm:text-24 sm:px-38">
												Войти
											</Button>
										</Link>
									</Branch>
								</div>

								<Separator />

								<nav>
									<ul className="flex flex-col space-y-28 font-medium text-24">
										{[
											{
												path: ROUTER_PATHS.FREELANCE_TEENS_COURSES,
												label: 'Курсы "Freelance teens"',
											},
											{
												path: ROUTER_PATHS.EDUCATION_COURSES,
												label: 'Курсы "Образование"',
											},
											{
												path: ROUTER_PATHS.LANGUAGE_COURSES,
												label: 'Курсы "Языки"',
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
											<li
												key={path}
												className="underline"
											>
												<Link to={path}>{label}</Link>
											</li>
										))}
									</ul>
								</nav>

								<Branch if={isAuthenticated}>
									<>
										<div className="w-full h-[1px] bg-[#434343]" />

										<button
											onClick={() => {
												logout().then(() => {
													queryClient.setQueryData<
														MaybeObject<
															GetViewerDto["res"]
														>
													>(
														viewerQueryKeys[
															"get-viewer"
														].queryKey,
														{
															credentials: null,
														},
													);
												});
											}}
											className="w-fit"
										>
											<span className="underline underline-offset-4 text-28 font-medium">
												Выйти из аккаунта
											</span>
										</button>
									</>
								</Branch>
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
