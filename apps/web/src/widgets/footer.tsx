import {Link} from "wouter";

import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	Container,
	Icon,
} from "@shared/ui";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-primary pt-[6rem] pb-[4rem]">
			<Container>
				<div className="flex flex-col space-y-[10rem] text-[#fbfbfb]">
					<div className="flex xs:hidden">
						<div className="w-1/4 flex flex-col space-y-16">
							<h6 className="font-bold text-[2rem]">
								О компании
							</h6>

							<ul className="flex flex-col space-y-8">
								<li>
									<Link to="/education" className="underline">
										Взрослые курсы
									</Link>
								</li>
								<li>
									<Link
										to="/freelance-teens"
										className="underline"
									>
										Детские курсы
									</Link>
								</li>
							</ul>
						</div>

						<div className="w-1/4 flex flex-col space-y-16">
							<h6 className="font-bold text-[2rem]">
								Наши проекты
							</h6>

							<ul className="flex flex-col space-y-8">
								<li>Проект 1</li>
								<li>Проект 2</li>
							</ul>
						</div>

						<div className="w-1/4 flex flex-col space-y-16">
							<h6 className="font-bold text-[2rem]">Контакты</h6>

							<ul className="flex flex-col space-y-8 text-[1.4rem]">
								<li className="flex space-x-16 items-center">
									<span className="w-30 h-30 flex justify-center items-center">
										<Icon.Social.Whatsapp className="w-28 h-28 fill-[#fbfbfb]" />
									</span>

									<span>+996 (500) 431 430</span>
								</li>

								<li className="flex space-x-16 items-center">
									<span className="w-30 h-30 flex justify-center items-center">
										<Icon.Feature.Telephone className="w-22 h-22 fill-[#fbfbfb]" />
									</span>

									<span>+996 (500) 431 430</span>
								</li>

								<li className="flex space-x-16 items-center">
									<span className="w-30 h-30 flex justify-center items-center">
										<Icon.Mail className="w-20 h-20 fill-[#fbfbfb]" />
									</span>

									<span>info@freelancesch.com</span>
								</li>

								<li className="flex space-x-16 items-center">
									<span className="w-30 h-30 flex justify-center items-center">
										<Icon.Location className="w-26 h-26 fill-[#fbfbfb]" />
									</span>

									<span>Исанова, 118</span>
								</li>
							</ul>
						</div>

						<div className="w-1/4 flex flex-col space-y-16">
							<h6 className="font-bold text-[2rem]">
								Мы в социальных сетях
							</h6>

							<ul className="flex flex-wrap items-center -m-8">
								<li className="m-8">
									<Icon.Social.Instagram className="w-[3rem] h-[3rem] fill-[#fbfbfb]" />
								</li>

								<li className="m-8">
									<Icon.Social.Linkedin className="w-[3rem] h-[3rem] text-[#fbfbfb]" />
								</li>

								<li className="m-8">
									<Icon.Social.TelegramFilled className="w-34 h-34 fill-[#fbfbfb]" />
								</li>

								<li className="m-8">
									<Icon.Social.Whatsapp className="w-34 h-34 fill-[#fbfbfb]" />
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

						<ul className="flex flex-wrap items-center -m-8">
							<li className="m-12">
								<Icon.Social.Instagram className="w-34 h-34 fill-[#fbfbfb]" />
							</li>

							<li className="m-12">
								<Icon.Social.Linkedin className="w-34 h-34 text-[#fbfbfb]" />
							</li>

							<li className="m-12">
								<Icon.Social.TelegramFilled className="w-34 h-34 fill-[#fbfbfb]" />
							</li>

							<li className="m-12">
								<Icon.Social.Whatsapp className="w-34 h-34 fill-[#fbfbfb]" />
							</li>
						</ul>
					</div>

					<div className="flex justify-center">
						<span className="font-bold text-[1.8rem] text-[#fbfbfb]">
							© 2024 Freelance School. All Rights Reserved.
						</span>
					</div>
				</div>
			</Container>
		</footer>
	);
};
