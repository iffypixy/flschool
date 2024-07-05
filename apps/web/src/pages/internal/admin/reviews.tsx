import * as RXTabs from "@radix-ui/react-tabs";

import {
	AdminTemplate,
	useCourseMetrics,
	useExpertMetrics,
	useLessonMetrics,
} from "@features/cms/admin";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
} from "@shared/ui";

enum Tab {
	COURSES,
	LESSONS,
	EXPERTS,
}

export const InternalAdminReviewsPage: React.FC = () => {
	const {metrics: courses} = useCourseMetrics();
	const {metrics: lessons} = useLessonMetrics();
	const {metrics: experts} = useExpertMetrics();

	return (
		<AdminTemplate title="Отзывы">
			<RXTabs.Root
				defaultValue={String(Tab.COURSES)}
				className="flex flex-col space-y-36"
			>
				<RXTabs.List className="flex space-x-12 items-center mb-24">
					{[
						{
							id: Tab.COURSES,
							label: "По курсам",
						},
						{
							id: Tab.LESSONS,
							label: "По урокам",
						},
						{
							id: Tab.EXPERTS,
							label: "По экспертам",
						},
					].map(({id, label}) => (
						<RXTabs.Trigger
							key={id}
							value={String(id)}
							className="py-8 px-16 rounded-8 xs:text-24 xs:px-24 text-center border border-[#03c1cd] data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-[#fff] transition-colors duration-300"
						>
							<span>{label}</span>
						</RXTabs.Trigger>
					))}
				</RXTabs.List>

				<RXTabs.Content value={String(Tab.COURSES)}>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Курс</TableHead>
								<TableHead>Средний рейтинг</TableHead>
								<TableHead>Количество отзывов</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{courses?.map((c) => (
								<TableRow key={c.id}>
									<TableCell>{c.name}</TableCell>
									<TableCell>{c.rating.toFixed(2)}</TableCell>
									<TableCell>
										{c.reviews.toFixed(2)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</RXTabs.Content>

				<RXTabs.Content value={String(Tab.LESSONS)}>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Урок</TableHead>
								<TableHead>Курс</TableHead>
								<TableHead>Средний рейтинг</TableHead>
								<TableHead>Количество отзывов</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{lessons?.map((l) => (
								<TableRow key={l.id}>
									<TableCell>{l.name}</TableCell>
									<TableCell>{l.course.name}</TableCell>
									<TableCell>{l.rating.toFixed(2)}</TableCell>
									<TableCell>
										{l.reviews.toFixed(2)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</RXTabs.Content>

				<RXTabs.Content value={String(Tab.EXPERTS)}>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Эксперт</TableHead>
								<TableHead>Средний рейтинг</TableHead>
								<TableHead>Количество отзывов</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{experts?.map((e) => (
								<TableRow key={e.id}>
									<TableCell>
										{e.firstName} {e.lastName}
									</TableCell>
									<TableCell>{e.rating.toFixed(2)}</TableCell>
									<TableCell>
										{e.reviews.toFixed(2)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</RXTabs.Content>
			</RXTabs.Root>
		</AdminTemplate>
	);
};
