import {Icon} from "@shared/ui";

export const TelegramAd: React.FC = () => (
	<div className="h-fit flex flex-col bg-[#fff] shadow-even-sm rounded-16 space-y-28 p-32">
		<h5 className="font-bold text-28 xs:text-32">
			Telegram-канал "Freelance Job"
		</h5>

		<div className="flex flex-col space-y-8 text-18 xs:text-22 xs:space-y-2">
			<span className="font-semibold">
				Получай самые актуальные вакансии каждый день
			</span>

			<span>Присоединяйтесь в Telegram-канал!</span>
		</div>

		<button className="w-fit inline-flex items-center space-x-16 border border-primary rounded-32 px-36 py-16">
			<Icon.Social.TelegramFilled className="fill-primary w-28 h-auto" />

			<span className="text-primary font-medium text-18 xs:text-22">
				Присоединиться
			</span>
		</button>
	</div>
);
