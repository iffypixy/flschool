import {Controller, useForm} from "react-hook-form";
import {Tag} from "emblor";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import * as RXTabs from "@radix-ui/react-tabs";
import {useLocation, useParams} from "wouter";
import {useDebounce} from "use-debounce";

import {
	AdminTemplate,
	CreateLesson,
	EditLesson,
	HomeworkForm,
	useCourse,
	useDeleteCourse,
	useDeleteLesson,
	useEditCourse,
	useSearchExperts,
} from "@features/cms/admin";
import {
	Input,
	Label,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
	TagInput,
	Button,
	Accordion,
	AccordionTrigger,
	AccordionContent,
	AccordionItem,
	ReadonlyTagInput,
	Fullscreen,
	Center,
	Loader,
	AutoComplete,
} from "@shared/ui";
import {Nullable} from "@shared/lib/types";
import {CourseType, courseTypeToLabel} from "@entities/course";
import {Language, languageToLabel} from "@entities/language";
import {Expert} from "@entities/expert";
import {UploadedFile} from "@entities/file";
import {UploadZone} from "@features/upload";
import {ROUTER_PATHS} from "@app/router/paths";

const schema = z.object({
	type: z.nativeEnum(CourseType),
	name: z.string().min(1),
	language: z.nativeEnum(Language),
	hook: z.string().min(1),
	audience: z.array(z.object({}).required()).min(1),
	description: z.string().min(1),
	preview: z.object({}).required(),
	duration: z.number(),
	price: z.number().nullable(),
	author: z
		.object({
			search: z.string(),
			data: z.object({}).required(),
		})
		.required(),
});

enum Tab {
	GENERAL,
	LESSONS,
}

export const InternalAdminCoursePage: React.FC = () => {
	const [, navigate] = useLocation();

	const {id} = useParams() as {id: string};
	const {course, isFetching} = useCourse(id);

	const {
		control,
		register,
		formState,
		handleSubmit,
		setValue,
		watch,
		getValues,
	} = useForm<{
		type: Nullable<CourseType>;
		name: Nullable<string>;
		language: Nullable<Language>;
		hook: Nullable<string>;
		audience: Tag[];
		description: Nullable<string>;
		preview: Nullable<UploadedFile>;
		duration: Nullable<number>;
		price: Nullable<number>;
		author: {
			search: string;
			data: Nullable<Expert>;
		};
	}>({
		mode: "onChange",
		resolver: zodResolver(schema),
		values: {
			type: course?.type || null,
			name: course?.name || null,
			language: course?.language || null,
			hook: course?.hook || null,
			audience:
				course?.audience.map((a, idx) => ({
					id: String(idx),
					text: a,
				})) || [],
			description: course?.description || null,
			duration: course?.duration || null,
			price: course?.price || null,
			preview: course?.preview || null,
			author: {
				search: "",
				data: course?.author || null,
			},
		},
	});

	const [author, preview] = watch(["author", "preview"]);

	const [search] = useDebounce(author.search, 300);
	const {experts, isFetching: areExpertsFetching} = useSearchExperts({
		query: search,
	});

	const {editCourse} = useEditCourse();
	const {deleteCourse} = useDeleteCourse();
	const {deleteLesson} = useDeleteLesson();

	if (isFetching)
		return (
			<Fullscreen>
				<Center>
					<Loader />
				</Center>
			</Fullscreen>
		);

	return (
		<AdminTemplate title="Редактирование курса">
			<RXTabs.Root defaultValue={String(Tab.GENERAL)}>
				<RXTabs.List className="flex space-x-12 items-center mb-24">
					{[
						{
							id: Tab.GENERAL,
							label: "Общая информация",
						},
						{
							id: Tab.LESSONS,
							label: "Уроки",
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

				<RXTabs.Content value={String(Tab.GENERAL)}>
					<form
						onSubmit={handleSubmit(() => {
							const form = getValues();

							editCourse({
								id: course!.id,
								type: form.type!,
								name: form.name!,
								language: form.language!,
								price: form.price!,
								audience: form.audience.map((t) => t.text),
								hook: form.hook!,
								duration: form.duration!,
								description: form.description!,
								previewFileId: form.preview!.id,
								authorId: form.author.data!.id,
							}).then(() => {
								navigate(ROUTER_PATHS.INTERNAL.ADMIN.COURSES);
							});
						})}
						className="flex flex-col space-y-48"
					>
						<div className="flex flex-col bg-[#fbfbfb] shadow-even-sm space-y-36 p-36 rounded-lg">
							<h5 className="text-28 font-semibold">
								Информация
							</h5>

							<div className="flex flex-col space-y-24">
								<div className="flex items-center space-x-28">
									<div className="flex flex-col space-y-8 w-1/2">
										<Label>Тип курса</Label>

										<Controller
											name="type"
											control={control}
											render={({
												field: {ref, ...field},
											}) => (
												<Select
													{...field}
													value={
														field.value || undefined
													}
													onValueChange={
														field.onChange
													}
												>
													<SelectTrigger>
														<SelectValue placeholder="Выберите тип курса" />
													</SelectTrigger>

													<SelectContent>
														<SelectGroup>
															{Object.values(
																CourseType,
															).map((value) => (
																<SelectItem
																	key={value}
																	value={
																		value
																	}
																>
																	{courseTypeToLabel(
																		value,
																	)}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											)}
										/>
									</div>

									<div className="flex flex-col space-y-8 w-1/2">
										<Label htmlFor="name">Название</Label>

										<Input
											id="name"
											type="text"
											placeholder="Введите название курса"
											{...register("name")}
										/>
									</div>
								</div>

								<div className="flex items-center space-x-28">
									<div className="flex flex-col space-y-8 w-1/2">
										<Label>Язык курса</Label>

										<Controller
											name="language"
											control={control}
											render={({
												field: {ref, ...field},
											}) => (
												<Select
													{...field}
													value={
														field.value || undefined
													}
													onValueChange={
														field.onChange
													}
												>
													<SelectTrigger>
														<SelectValue placeholder="Выберите язык курса" />
													</SelectTrigger>

													<SelectContent>
														<SelectGroup>
															{Object.values(
																Language,
															).map((value) => (
																<SelectItem
																	key={value}
																	value={
																		value
																	}
																>
																	{languageToLabel(
																		value,
																	)}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											)}
										/>
									</div>

									<div className="flex flex-col space-y-8 w-1/2">
										<Label htmlFor="price">Цена</Label>

										<Input
											id="price"
											type="number"
											min={0}
											placeholder="Введите цену курса"
											{...register("price")}
										/>
									</div>
								</div>

								<div className="flex flex-col space-y-8">
									<Label htmlFor="duration">
										Длительность (в месяцах)
									</Label>

									<Input
										id="duration"
										type="number"
										placeholder="Введите длительность курса"
										{...register("duration", {
											valueAsNumber: true,
										})}
									/>
								</div>

								<div className="flex flex-col space-y-8">
									<Label>Аудитория</Label>

									<Controller
										name="audience"
										control={control}
										render={({field}) => (
											<TagInput
												placeholder="Введите аудиторию курса"
												tags={field.value}
												setTags={field.onChange}
											/>
										)}
									/>
								</div>

								<div className="flex flex-col space-y-8">
									<Label htmlFor="hook">Хук</Label>

									<Input
										id="hook"
										type="text"
										placeholder="Введите вызывающее описание"
										{...register("hook")}
									/>
								</div>

								<div className="flex flex-col space-y-8">
									<Label htmlFor="description">
										Описание
									</Label>

									<Textarea
										id="description"
										placeholder="Введите описание курса"
										{...register("description")}
									/>
								</div>
							</div>
						</div>

						<div className="flex flex-col bg-[#fbfbfb] shadow-even-sm space-y-36 p-36 rounded-lg">
							<h5 className="text-28 font-semibold">
								Видео-превью
							</h5>

							<div className="flex flex-col space-y-24">
								<UploadZone
									key={preview?.name}
									fileName={preview?.name}
									onUpload={(file) =>
										setValue("preview", file, {
											shouldValidate: true,
										})
									}
								>
									Выберите файл для видео-превью
								</UploadZone>
							</div>
						</div>

						<div className="flex flex-col bg-[#fbfbfb] shadow-even-sm space-y-36 p-36 rounded-lg">
							<h5 className="text-28 font-semibold">
								Автор курса
							</h5>

							<div className="flex flex-col space-y-24">
								<Controller
									key={author.data?.id}
									name="author"
									control={control}
									render={({field}) => (
										<AutoComplete
											isLoading={areExpertsFetching}
											options={
												experts?.map((e) => ({
													value: e.id,
													label: `${e.firstName} ${e.lastName}`,
												})) || []
											}
											placeholder="Найдите эксперта"
											onInputChange={(search) => {
												field.onChange({
													...field.value,
													search,
												});
											}}
											input={field.value.search}
											onValueChange={(value) => {
												field.onChange({
													...field.value,
													data:
														experts?.find(
															(e) =>
																e.id ===
																value.value,
														) || null,
												});
											}}
											value={
												author.data
													? {
															label: `${author.data.firstName} ${author.data.lastName}`,
															value: author.data
																.id,
														}
													: undefined
											}
										/>
									)}
								/>
							</div>
						</div>

						<div className="flex justify-end items-center space-x-12">
							<Button
								onClick={() => {
									deleteCourse(course!.id).then(() => {
										navigate(
											ROUTER_PATHS.INTERNAL.ADMIN.COURSES,
										);
									});
								}}
								color="error"
								type="button"
							>
								Удалить
							</Button>

							<Button>Редактировать</Button>
						</div>
					</form>
				</RXTabs.Content>

				<RXTabs.Content value={String(Tab.LESSONS)}>
					<div className="flex flex-col space-y-48">
						<div className="flex flex-col bg-[#fbfbfb] shadow-even-sm space-y-36 p-36 rounded-lg">
							<h5 className="text-28 font-semibold">Уроки</h5>

							<Accordion
								type="multiple"
								className="flex flex-col space-y-40"
							>
								{course?.lessons.map((lesson) => (
									<AccordionItem
										key={lesson.id}
										value={lesson.id}
									>
										<AccordionTrigger>
											{lesson.name}
										</AccordionTrigger>

										<AccordionContent>
											<div className="flex flex-col space-y-24">
												<video
													className="w-full h-auto rounded-12"
													controls
													src={`${lesson.video.url}#t=0.1`}
													preload="metadata"
												/>

												<ReadonlyTagInput
													tags={lesson.topics}
												/>

												<HomeworkForm
													homework={{
														type: lesson.homework
															.type,
														test: lesson.homework.test?.questions.map(
															(q) => ({
																text: q.text,
																answers:
																	q.answers.map(
																		(a) =>
																			a.text,
																	),
																correctAnswerIndex:
																	q.answers.findIndex(
																		(a) =>
																			a.isCorrect,
																	),
															}),
														),
														text: lesson.homework
															.text,
													}}
													disabled
												/>

												<div className="flex justify-end items-center space-x-12">
													<Button
														type="button"
														color="error"
														onClick={() => {
															deleteLesson({
																courseId:
																	course!.id,
																lessonId:
																	lesson.id,
															});
														}}
													>
														Удалить
													</Button>

													<EditLesson
														lesson={{
															...lesson,
															homework: {
																type: lesson
																	.homework
																	.type,
																test: lesson.homework.test?.questions.map(
																	(q) => ({
																		text: q.text,
																		answers:
																			q.answers.map(
																				(
																					a,
																				) =>
																					a.text,
																			),
																		correctAnswerIndex:
																			q.answers.findIndex(
																				(
																					a,
																				) =>
																					a.isCorrect,
																			),
																	}),
																),
																text: lesson
																	.homework
																	.text,
															},
														}}
													>
														<Button type="button">
															Редактировать
														</Button>
													</EditLesson>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>

						<div className="flex justify-end items-center">
							<CreateLesson>
								<Button type="button">Создать урок</Button>
							</CreateLesson>
						</div>
					</div>
				</RXTabs.Content>
			</RXTabs.Root>
		</AdminTemplate>
	);
};
