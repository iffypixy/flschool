import {Link} from "wouter";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import {isValidPhoneNumber} from "react-phone-number-input";
import {zodResolver} from "@hookform/resolvers/zod";

import {
	AccordionItem,
	Accordion,
	AccordionTrigger,
	Button,
	Container,
	GradientButton,
	Icon,
	Input,
	Label,
	ContentTemplate,
	PhoneInput,
	Loader,
	Swiper,
	Spinner,
	AccordionContent,
} from "@shared/ui";
import {Branch} from "@shared/lib/branch";
import {CourseTag, useCourseNames} from "@entities/course";
import {Feature} from "@widgets/features";
import phone from "@shared/assets/phone.png";
import telegram1 from "@shared/assets/telegram/1.png";
import telegram2 from "@shared/assets/telegram/2.png";
import telegram3 from "@shared/assets/telegram/3.png";
import banner1 from "@shared/assets/banner-1.png";
import banner2 from "@shared/assets/banner-2.png";
import hero from "@shared/assets/hero.png";
import {ROUTER_PATHS} from "@app/router/paths";
import {useSubmitConsultationRequest} from "@entities/consultation-request";

export const GuestHomePage: React.FC = () => {
	const {courses, isFetching: areCourseNamesFetching} = useCourseNames();

	return (
		<ContentTemplate className="flex flex-col mt-38" showGoBack={false}>
			<section className="flex">
				<Container>
					<div className="flex space-x-12 justify-between xs:flex-wrap xs:space-x-0">
						<div className="flex flex-col w-[50%] text-[#434343] xs:w-full relative">
							<h1 className="font-bold text-[6.4rem] xs:text-[5rem] [#fbfbfb] whitespace-pre-line leading-[7.2rem] xs:leading-[5rem]">
								Онлайн обучение{"\n"}
								<span className="text-primary">#без</span>{" "}
								границ
							</h1>

							<span className="text-24 xs:text-[2.6rem] max-w-[calc(100%-20rem)] text-[#434343] mt-24">
								Выбери онлайн-курс и прокачай свои навыки не
								выходя из дома
							</span>

							<div className="flex space-x-12 mt-44">
								<Link to="/education">
									<Button className="xs:text-22 !px-24 !py-10">
										Начать сейчас
									</Button>
								</Link>
							</div>

							<img
								src={hero}
								alt="Hero-картинка"
								className="absolute max-w-[22rem] w-full h-auto right-0 -bottom-[7rem] xs:block hidden -z-10"
							/>
						</div>

						<div className="flex">
							<ConsultationForm1 />

							<img
								src={hero}
								alt="Hero-картинка"
								className="max-w-[29rem] h-auto inline-flex object-contain z-10 -mt-80 -ml-10 xs:hidden"
							/>
						</div>
					</div>
				</Container>
			</section>

			<section className="my-[12rem] xs:my-[6rem]">
				<Container>
					<div className="flex flex-col items-center">
						<h3 className="font-semibold text-36 text-[#434343] mb-40">
							Получи <span className="text-primary">#все</span>{" "}
							курсы разом
						</h3>

						{true && (
							<div className="w-[90%] mx-auto">
								<div className="flex justify-center flex-wrap -mx-8 -my-12">
									{courses?.map(({id, name}) => (
										<Link
											key={id}
											to={ROUTER_PATHS.COURSE.filled(id)}
											className="mx-8 my-12"
										>
											<CourseTag>{name}</CourseTag>
										</Link>
									))}
								</div>
							</div>
						)}

						{areCourseNamesFetching && <Loader />}
					</div>
				</Container>
			</section>

			<section className="bg-primary py-[8rem] my-[6rem] xs:my-[3rem]">
				<Container>
					<div className="flex justify-between xs:flex-col">
						<div className="flex flex-col w-[45%] text-[#fbfbfb] xs:w-full">
							<h5 className="font-bold text-[4rem] mb-8">
								Telegram-канал
							</h5>

							<span className=" text-[2rem]">
								Присоединяйтесь к Telegram-каналу Дины Руслан и
								получайте ежедневные обновления с полезными
								ссылками и свежими новостями из мира IT
							</span>

							<a
								href="https://t.me/freelancerscommunity2024"
								target="_blank"
							>
								<Button className="!bg-[#fff] !text-[#151515] w-fit mt-32 xs:text-24">
									Перейти в Telegram
								</Button>
							</a>
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
			</section>

			<section className="my-[6rem] xs:my-[6rem]">
				<Container>
					<div className="flex flex-col space-y-8">
						<h3 className="text-[#434343] font-bold text-[3.8rem]">
							<span className="relative text-[#fbfbfb] before:bg-gradient before:absolute before:w-full before:h-full p-10 before:rounded-xl before:-rotate-[3deg] before:left-0 before:top-0 before:-z-10">
								Почему стоит
							</span>{" "}
							начать с нами?
						</h3>

						<div className="flex flex-wrap justify-between xs:flex-col">
							{[
								{
									icon: (
										<Icon.Feature.Speedometer className="text-primary" />
									),
									title: "120 часов с менторами",
									description:
										"Интенсивное обучение под руководством наших менторов-разработчиков с более чем 5-летним опытом в IT-сфере",
									highlighted: 2,
								},
								{
									icon: (
										<Icon.Feature.Tools className="text-primary" />
									),
									title: "320 часов тех. поддержки",
									description:
										"Помощь и поддержка в решении домашних заданий и ответы на ваши вопросы от нашей команды технических экспертов",
									highlighted: 2,
								},
								{
									icon: (
										<Icon.Feature.Map className="text-primary" />
									),
									title: "2 часа консультаций",
									description:
										"Персональные консультации с нашими HR-специалистами и проектными менеджерами для составления вашего резюме и портфолио",
									highlighted: 2,
								},
								{
									icon: (
										<Icon.Feature.Headphones className="text-primary" />
									),
									title: "Поддержка Freelance School",
									description:
										"Менеджеры из Freelance School всегда на связи, чтобы помочь вам на каждом этапе обучения и развития",
									highlighted: 2,
								},
								{
									icon: (
										<Icon.Feature.Rocket className="text-primary" />
									),
									title: "Бонусный курс",
									description:
										"Наш эксклюзивный онлайн курс по трудоустройству в качестве дополнительного бонуса к основной программе",
									highlighted: 1,
								},
								{
									icon: (
										<Icon.Feature.Heart className="text-primary" />
									),
									title: "Уютная атмосфера",
									description:
										"Наши компьютерные классы и коворкинг созданы для комфортной учебы + уютная кухня с кофе и чаем",
									highlighted: 2,
								},
							].map((feature, idx) => (
								<Feature key={idx} {...feature} />
							))}
						</div>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex flex-col space-y-18">
						<h3 className="text-38 text-[#434343] font-bold">
							Новости и обновления
						</h3>

						<Swiper
							showArrows
							slidesToShow={2}
							infinite
							dots
							arrows={false}
							responsive={[
								{
									breakpoint: 768,
									settings: {
										slidesToShow: 1,
									},
								},
							]}
							className="flex -m-16"
						>
							{[
								{
									label: "Пригласи друга и получи скидку на обучение!",
									img: banner1,
								},
								{
									label: "Скачай сертификат по завершению курса в личном кабинете.",
									img: banner2,
								},
							].map((banner, idx) => (
								<div key={idx} className="w-1/2 p-16 sm:w-full">
									<div className="flex items-center justify-between bg-gradient h-[32rem] md:h-[26rem] rounded-[3.2rem] p-28">
										<span className="text-24 font-medium text-[#fff] md:text-18 sm:text-26 xs:text-24">
											{banner.label}
										</span>

										<img
											src={banner.img}
											alt="Баннер"
											className="max-w-[28rem] w-full h-auto md:max-w-[20rem] sm:max-w-[22rem] xs:max-w-[18rem]"
										/>
									</div>
								</div>
							))}
						</Swiper>
					</div>
				</Container>
			</section>

			<section className="my-[8rem] xs:my-[6rem]">
				<Container>
					<div className="flex flex-col space-y-32">
						<h3 className="text-[#434343] font-bold text-[3.8rem] flex xs:flex-col">
							<span className="w-fit mr-12 xs:mr-0">
								Ответы на
							</span>
							<span className="w-fit relative text-[#fbfbfb] before:bg-gradient before:absolute before:w-full before:h-full before:rounded-xl before:rotate-[1deg] before:left-0 before:top-0 before:-z-10">
								ваши вопросы
							</span>
						</h3>

						<div>
							<Accordion
								type="multiple"
								className="flex flex-col space-y-26 [&_svg]:!fill-primary [&_svg]:w-28 [&_svg]:h-auto"
							>
								<AccordionItem value="item-1">
									<AccordionTrigger>
										Могу ли я гарантировать себе
										трудоустройство после окончания курсов?
									</AccordionTrigger>

									<AccordionContent>
										<p className="text-18 xs:text-20">
											Хотя мы предоставляем все
											необходимые инструменты и знания для
											достижения успеха в IT-индустрии,
											трудоустройство зависит от многих
											факторов, включая вашу личную
											инициативу, усердие и
											профессиональное развитие. Мы не
											можем гарантировать непосредственное
											трудоустройство, но мы обязуемся
											поддерживать вас на каждом этапе
											вашего обучения.
										</p>
									</AccordionContent>
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
			</section>

			<section className="bg-primary pt-[8rem] -mb-64">
				<Container>
					<div className="flex flex-col space-y-24 xs:space-y-32">
						<div className="flex flex-col space-y-8 text-[#fbfbfb] xs:space-y-12">
							<h3 className="font-semibold text-[3.8rem] leading-[4.6rem] xs:text-[4.8rem]">
								Получите индивидуальную консультацию
							</h3>

							<span className="text-[2.2rem]">
								Мы с удовольствием ответим на все ваши вопросы и
								поможем определиться с выбором курса!
							</span>
						</div>

						<ConsultationForm2 />
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};

const schema = z.object({
	name: z.string().min(1),
	phone: z.string().refine(isValidPhoneNumber),
});

const ConsultationForm1: React.FC = () => {
	const {register, control, handleSubmit, formState} = useForm<{
		name: string;
		phone: string;
	}>({
		resolver: zodResolver(schema),
	});

	const {submitConsultationRequest} = useSubmitConsultationRequest();

	return (
		<div className="w-[38rem] rounded-18 p-30 xs:p-40 bg-gradient h-fit space-y-8 xs:w-full xs:mt-64">
			<form
				onSubmit={handleSubmit((form) => {
					return submitConsultationRequest({
						name: form.name,
						phone: form.phone,
					});
				})}
				className="flex flex-col space-y-30 mb-2"
			>
				<div className="flex flex-col space-y-24">
					<div className="flex flex-col space-y-8">
						<Label
							htmlFor="name"
							className="text-[#fff] xs:text-22"
						>
							Ваше имя
						</Label>

						<Input
							{...register("name", {
								required: true,
							})}
							id="name"
							placeholder="Введите ваше имя"
							className="text-[#fff] placeholder:text-[#fff]/60 xs:text-22"
						/>
					</div>

					<div className="flex flex-col space-y-8">
						<Label
							htmlFor="phone"
							className="text-[#fff]  xs:text-22"
						>
							Номер телефона
						</Label>

						<Controller
							name="phone"
							control={control}
							render={({field}) => (
								<PhoneInput
									id="phone"
									{...field}
									onChange={(value) => field.onChange(value)}
									defaultCountry="KZ"
									countries={["KZ"]}
									placeholder="+7"
									className="[&>input]:text-[#fff] [&>input]:placeholder:text-[#fff]/60 [&>input]:xs:text-22 [&>button>span>svg]:border [&>button>span>svg]:border-[#000]"
								/>
							)}
						/>
					</div>
				</div>

				<GradientButton
					disabled={
						!formState.isValid ||
						formState.isSubmitting ||
						formState.isSubmitted
					}
					className="xs:text-26"
				>
					{formState.isSubmitted ? (
						"Отправлено"
					) : (
						<Branch if={formState.isSubmitting}>
							<Spinner className="mx-auto" />

							<>Подобрать обучение</>
						</Branch>
					)}
				</GradientButton>
			</form>

			<span className="text-[#EAEAEA] inline-flex text-[1.4rem] xs:text-18">
				Нажимая на кнопку, вы даете согласие на обработку персональных
				данных
			</span>
		</div>
	);
};

const ConsultationForm2: React.FC = () => {
	const {register, control, handleSubmit, formState} = useForm<{
		name: string;
		phone: string;
	}>({
		resolver: zodResolver(schema),
	});

	const {submitConsultationRequest} = useSubmitConsultationRequest();

	return (
		<div className="flex flex-col space-y-12">
			<form
				onSubmit={handleSubmit((form) => {
					return submitConsultationRequest({
						name: form.name,
						phone: form.phone,
					});
				})}
				className="flex space-x-16 xs:flex-col xs:space-x-0 xs:space-y-24"
			>
				<Input
					placeholder="Имя*"
					className="!w-1/3 xs:!w-full text-[#fff] placeholder:text-[#fff]/60 xs:text-22 !rounded-20 !px-28 !py-18"
					{...register("name")}
				/>

				<Controller
					name="phone"
					control={control}
					render={({field}) => (
						<PhoneInput
							{...field}
							defaultCountry="KZ"
							countries={["KZ"]}
							placeholder="+7"
							className="w-1/3 xs:w-full [&>input]:text-[#fff] [&>input]:placeholder:text-[#fff]/60 [&>input]:xs:text-22 [&>button>span>svg]:border [&>button>span>svg]:border-[#000] [&>input]:!rounded-20 [&>input]:!px-28 [&>input]:!py-18"
							onChange={(value) => field.onChange(value)}
						/>
					)}
				/>

				<GradientButton
					disabled={
						!formState.isValid ||
						formState.isSubmitting ||
						formState.isSubmitted
					}
					className="w-1/3 xs:w-full py-14 text-24 xs:text-26 !rounded-20"
				>
					{formState.isSubmitted ? (
						"Отправлено"
					) : (
						<Branch if={formState.isSubmitting}>
							<Loader className="mx-auto" />

							<>Оставить заявку</>
						</Branch>
					)}
				</GradientButton>
			</form>

			<span className="text-[1.4rem] text-[#fbfbfb] xs:text-18">
				Отправляя заявку, вы даете согласие на обработку персональных
				данных.
			</span>
		</div>
	);
};
