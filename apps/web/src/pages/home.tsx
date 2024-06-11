import {
	AccordionItem,
	Accordion,
	AccordionTrigger,
	Button,
	Container,
	DropdownContent,
	Dropdown,
	DropdownTrigger,
	GradientButton,
	Icon,
	Input,
	Label,
	Logo,
	Swiper,
} from "@shared/ui";
import {CourseTagsBlock} from "@features/course/tag";
import {CoursePreview} from "@features/course";
import {Feature} from "@features/feature";
import course1 from "@shared/assets/course1.png";
import course2 from "@shared/assets/course2.png";
import course3 from "@shared/assets/course3.png";
import phone from "@shared/assets/phone.png";
import telegram1 from "@shared/assets/telegram/1.png";
import telegram2 from "@shared/assets/telegram/2.png";
import telegram3 from "@shared/assets/telegram/3.png";

export const HomePage: React.FC = () => (
	<div className="w-full min-h-full">
		<header>
			<Container>
				<div className="flex justify-between items-center py-18">
					<Logo />

					<nav className="xs:hidden">
						<ul className="flex items-center space-x-[4rem] font-medium text-[1.4rem] text-[#151515]">
							<li>Freelance teams</li>
							<li>Образование</li>
							<li>Эксперты</li>
							<li>Языки</li>
							<li>Вакансии</li>
						</ul>
					</nav>

					<div className="flex items-center space-x-24">
						<Dropdown>
							<DropdownTrigger>
								<span className="inline-flex space-x-8 items-center text-[#151515] font-medium text-[1.4rem]">
									<span>RU</span>

									<Icon.Chevron.Down className="w-8 h-4" />
								</span>
							</DropdownTrigger>

							<DropdownContent></DropdownContent>
						</Dropdown>

						<Button>Войти</Button>
					</div>
				</div>
			</Container>
		</header>

		<main className="flex flex-col">
			<div className="flex py-[8rem]">
				<Container>
					<div className="flex space-x-12 justify-between xs:flex-wrap xs:space-x-0">
						<div className="flex flex-col w-[50%] space-y-40 text-[#434343] xs:w-full">
							<h1 className="font-bold text-[6.4rem] [#fbfbfb] space-pre-line leading-[7.6rem]">
								Онлайн обучение{"\n"}
								<span className="text-primary">#без</span>{" "}
								границ
							</h1>

							<span className="text-[2rem]">
								Выбери онлайн-курс и прокачай свои навыки не
								выходя из дома
							</span>

							<div className="flex space-x-12">
								<Button>Начать сейчас</Button>

								<Button color="secondary">
									Cвязаться с нами
								</Button>
							</div>
						</div>

						<div className="w-[38rem] rounded-18 p-[3rem] bg-gradient h-fit space-y-8 xs:w-full xs:mt-64">
							<form className="flex flex-col space-y-30 mb-2">
								<div className="flex flex-col space-y-24">
									<div className="flex flex-col space-y-2">
										<Label>Ваше имя</Label>

										<Input />
									</div>

									<div className="flex flex-col space-y-2">
										<Label>Номер телефона</Label>

										<Input />
									</div>
								</div>

								<GradientButton>
									Подобрать обучение
								</GradientButton>
							</form>

							<span className="text-[#EAEAEA] inline-flex text-[1.3rem] font-manrope">
								Нажимая на кнопку, вы даете согласие на
								обработку персональных данных
							</span>
						</div>
					</div>
				</Container>
			</div>

			<div className="py-[8rem]">
				<Container>
					<div className="flex flex-col items-center space-y-32">
						<h3 className="font-gotham font-bold text-[3.2rem] text-[#434343]">
							Получи <span className="text-primary">#все</span>{" "}
							курсы разом
						</h3>

						<div className="w-[75%] mx-auto">
							<CourseTagsBlock />
						</div>
					</div>
				</Container>
			</div>

			<div className="bg-primary py-[8rem] mt-[12rem]">
				<Container>
					<div className="flex justify-between xs:flex-col">
						<div className="flex flex-col w-[45%] text-[#fbfbfb] space-y-8 xs:w-full">
							<h5 className="font-gotham font-bold text-[4rem]">
								Telegram-канал
							</h5>

							<span className="font-gilroy text-[2rem]">
								Присоединяйтесь к Telegram-каналу Дины Руслан и
								получайте ежедневные обновления с полезными
								ссылками и свежими новостями из мира IT
							</span>
						</div>

						<div className="relative w-1/2 my-[-8rem] xs:w-full xs:mt-0 xs:h-[44rem]">
							<img
								src={telegram1}
								alt="Иконка телеграмма"
								className="absolute top-0 -translate-y-1/2 right-[60%] w-[12rem] h-auto xs:top-[25%]"
							/>

							<img
								src={telegram2}
								alt="Иконка телеграмма"
								className="absolute bottom-1/4 left-0 w-[12rem] h-auto -rotate-[20deg]"
							/>

							<img
								src={telegram3}
								alt="Иконка телеграмма"
								className="absolute right-0 bottom-1/4 w-[12rem] h-auto -rotate-[14deg]"
							/>

							<img
								src={phone}
								alt="Телефон с приложением телеграм"
								className="absolute right-[15%] bottom-0 h-[40rem] object-cover"
							/>
						</div>
					</div>
				</Container>
			</div>

			<div className="py-[8rem]">
				<Container>
					<div className="flex flex-col space-y-[5rem]">
						<h6 className="font-gotham font-bold text-[3.2rem] text-center">
							<span className="text-primary">
								#FreelanceSchool
							</span>{" "}
							на YouTube
						</h6>

						<div>
							<Swiper
								slidesToShow={2}
								slidesToScroll={1}
								speed={500}
								infinite
								responsive={[
									{
										breakpoint: 1012,
										settings: {
											slidesToShow: 1,
										},
									},
								]}
							>
								<CoursePreview
									name="Разработчик iOS в Google"
									author="Имя Фамилия"
									avatar={course1}
								/>

								<CoursePreview
									name="Senior Backend Developer"
									author="Имя Фамилия"
									avatar={course2}
								/>

								<CoursePreview
									name="Специалист в Data Science"
									author="Имя Фамилия"
									avatar={course3}
								/>
							</Swiper>
						</div>
					</div>
				</Container>
			</div>

			<div className="py-[8rem]">
				<Container>
					<div className="flex flex-col space-y-8">
						<h3 className="text-[#434343] font-gotham font-bold text-[3.8rem]">
							<span className="relative text-[#fbfbfb] before:bg-gradient before:absolute before:w-full before:h-full before:rounded-xl before:-rotate-[1deg] before:left-0 before:top-0 before:-z-10">
								Почему стоит
							</span>{" "}
							начать с нами?
						</h3>

						<div className="flex flex-wrap justify-between xs:flex-col">
							<Feature
								Icon={Icon.Clock}
								title="120 часов с менторами"
								description="Интенсивное обучение под руководством наших менторов-разработчиков с более чем 5-летним опытом в IT-сфере"
								highlighted={2}
							/>

							<Feature
								Icon={Icon.Tooling}
								title="320 часов тех. поддержки"
								description="Помощь и поддержка в решении домашних заданий и ответы на ваши вопросы от нашей команды технических экспертов"
								highlighted={2}
							/>

							<Feature
								Icon={Icon.Map}
								title="2 часа консультаций"
								description="Персональные консультации с нашими HR-специалистами и проектными менеджерами для составления вашего резюме и портфолио"
								highlighted={2}
							/>

							<Feature
								Icon={Icon.Headphones}
								title="Поддержка Freelance School"
								description="Менеджеры из Freelance School всегда на связи, чтобы помочь вам на каждом этапе обучения и развития"
								highlighted={2}
							/>

							<Feature
								Icon={Icon.Rocket}
								title="Бонусный курс"
								description="Наш эксклюзивный онлайн курс по трудоустройству в качестве дополнительного бонуса к основной программе"
								highlighted={1}
							/>

							<Feature
								Icon={Icon.Heart}
								title="Уютная атмосфера"
								description="Наши компьютерные классы и коворкинг созданы для комфортной учебы + уютная кухня с кофе и чаем"
								highlighted={2}
							/>
						</div>
					</div>
				</Container>
			</div>

			<div className="py-[8rem]">
				<Container>
					<div className="flex flex-col space-y-32">
						<h3 className="text-[#434343] font-gotham font-bold text-[3.8rem]">
							Ответы на{" "}
							<span className="relative text-[#fbfbfb] before:bg-gradient before:absolute before:w-full before:h-full before:rounded-xl before:rotate-[1deg] before:left-0 before:top-0 before:-z-10">
								ваши вопросы
							</span>
						</h3>

						<div>
							<Accordion
								type="multiple"
								className="flex flex-col space-y-26"
							>
								<AccordionItem value="item-1">
									<AccordionTrigger>
										Могу ли я гарантировать себе
										трудоустройство после окончания курсов?
									</AccordionTrigger>
								</AccordionItem>

								<AccordionItem value="item-2">
									<AccordionTrigger>
										Есть ли у вас курсы для абсолютных
										новичков в IT?
									</AccordionTrigger>
								</AccordionItem>

								<AccordionItem value="item-3">
									<AccordionTrigger>
										Нужно ли мне иметь специальное
										оборудование для участия в курсах?
									</AccordionTrigger>
								</AccordionItem>

								<AccordionItem value="item-4">
									<AccordionTrigger>
										Предоставляете ли вы сертификаты по
										окончании курсов?
									</AccordionTrigger>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</Container>
			</div>

			<div className="bg-primary py-[8rem] mt-[8rem]">
				<Container>
					<div className="flex flex-col space-y-24">
						<div className="flex flex-col space-y-8 text-[#fbfbfb]">
							<h3 className="font-gotham font-bold text-[3.8rem] leading-[4.6rem]">
								Получите индивидуальную консультацию
							</h3>

							<span className="font-gilroy text-[2.2rem]">
								Мы с удовольствием ответим на все ваши вопросы и
								поможем определиться с выбором курса!
							</span>
						</div>

						<div className="flex flex-col space-y-12">
							<form className="flex space-x-16 xs:flex-col xs:space-x-0 xs:space-y-24">
								<Input
									placeholder="Имя*"
									className="w-1/3 xs:w-full"
								/>

								<Input
									placeholder="Номер телефона*"
									className="w-1/3 xs:w-full"
								/>

								<GradientButton className="w-1/3 xs:w-full">
									Оставить заявку
								</GradientButton>
							</form>

							<span className="font-gotham text-[1.4rem] text-[#fbfbfb]">
								Отправляя заявку, вы даете согласие на обработку
								персональных данных.
							</span>
						</div>
					</div>
				</Container>
			</div>
		</main>

		<footer className="bg-[#151515] pt-[6rem] pb-[4rem]">
			<Container>
				<div className="flex flex-col space-y-[10rem] text-[#fbfbfb]">
					<div className="flex xs:hidden">
						<div className="w-1/4 flex flex-col space-y-16">
							<h6 className="font-gotham font-bold text-[2rem]">
								О компании
							</h6>

							<ul className="flex flex-col space-y-8">
								<li>Взрослые курсы</li>
								<li>Детские курсы</li>
							</ul>
						</div>

						<div className="w-1/4 flex flex-col space-y-16">
							<h6 className="font-gotham font-bold text-[2rem]">
								Наши проекты
							</h6>

							<ul className="flex flex-col space-y-8">
								<li>Проект 1</li>
								<li>Проект 2</li>
							</ul>
						</div>

						<div className="w-1/4 flex flex-col space-y-16">
							<h6 className="font-gotham font-bold text-[2rem]">
								Контакты
							</h6>

							<ul className="flex flex-col space-y-8 text-[1.4rem]">
								<li className="flex space-x-16 items-center">
									<Icon.Social.WhatsApp className="w-28 h-28" />

									<span>+996 (500) 431 430</span>
								</li>

								<li className="flex space-x-16 items-center">
									<Icon.Phone className="w-28 h-28" />

									<span>+996 (500) 431 430</span>
								</li>

								<li className="flex space-x-16 items-center">
									<Icon.Mail className="w-28 h-28" />

									<span>info@freelancesch.com</span>
								</li>

								<li className="flex space-x-16 items-center">
									<Icon.Location className="w-28 h-28" />

									<span>Исанова, 118</span>
								</li>
							</ul>
						</div>

						<div className="w-1/4 flex flex-col space-y-16">
							<h6 className="font-gotham font-bold text-[2rem]">
								Мы в социальных сетях
							</h6>

							<ul className="flex flex-wrap -m-8">
								<li className="m-8">
									<Icon.Social.Instagram className="w-[3rem] h-[3rem]" />
								</li>

								<li className="m-8">
									<Icon.Social.LinkedIn className="w-[3rem] h-[3rem]" />
								</li>

								<li className="m-8">
									<Icon.Social.YouTube className="w-[3rem] h-[3rem]" />
								</li>

								<li className="m-8">
									<Icon.Social.Twitter className="w-[3rem] h-[3rem]" />
								</li>

								<li className="m-8">
									<Icon.Social.Telegram className="w-[3rem] h-[3rem]" />
								</li>
							</ul>
						</div>
					</div>

					<div className="hidden xs:flex flex-col !mt-0 space-y-34">
						<Accordion
							type="single"
							className="w-full flex flex-col space-y-24"
						>
							<AccordionItem value="item-1">
								<AccordionTrigger className="text-[#fbfbfb] [&>svg]:fill-[#fbfbfb]">
									О компании
								</AccordionTrigger>
							</AccordionItem>

							<AccordionItem value="item-2">
								<AccordionTrigger className="text-[#fbfbfb] [&>svg]:fill-[#fbfbfb]">
									Наши проекты
								</AccordionTrigger>
							</AccordionItem>

							<AccordionItem value="item-3">
								<AccordionTrigger className="text-[#fbfbfb] [&>svg]:fill-[#fbfbfb]">
									Контакты
								</AccordionTrigger>
							</AccordionItem>
						</Accordion>

						<ul className="flex flex-wrap -m-8">
							<li className="m-12">
								<Icon.Social.Instagram className="w-34 h-34" />
							</li>

							<li className="m-12">
								<Icon.Social.LinkedIn className="w-34 h-34" />
							</li>

							<li className="m-12">
								<Icon.Social.YouTube className="w-34 h-34" />
							</li>

							<li className="m-12">
								<Icon.Social.Twitter className="w-34 h-34" />
							</li>

							<li className="m-12">
								<Icon.Social.Telegram className="w-34 h-34" />
							</li>
						</ul>
					</div>

					<div className="flex justify-center">
						<span className="font-gotham font-bold text-[1.8rem] text-[#fbfbfb]">
							© 2024 Freelance School. All Rights Reserved.
						</span>
					</div>
				</div>
			</Container>
		</footer>
	</div>
);
