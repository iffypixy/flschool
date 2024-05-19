import {cx} from "class-variance-authority";

import {PropsWithClassName} from "@shared/lib/types";

export const CourseTag: React.FCWC = ({children}) => (
	<div className="px-10 py-4 border border-[#EDEAEA] rounded-12 m-8">
		<span className="font-manrope font-medium text-[1.6rem] text-[#434343]">
			{children}
		</span>
	</div>
);

const tags = [
	"Эксперт по ChatGPT",
	"Рилсмейкер",
	"Сторисмейкер",
	"Веб дизайнер",
	"Копирайтер",
	"Психология",
	"Криптовалюта",
	"Брендбайер",
	"Мобилография",
	"Проджект менеджер",
	"Бренд дизайнер",
	"Ораторское искусство",
	"Интерьер дизайнер",
	"Нейромаркетолог",
	"Стилист",
];

export const CourseTagsBlock: React.FC<PropsWithClassName> = ({className}) => (
	<div
		className={cx("flex justify-center flex-wrap -m-[0.75rem]", className)}
	>
		{tags.map((t) => (
			<CourseTag key={t}>{t}</CourseTag>
		))}
	</div>
);
