import {useState} from "react";
import {cx} from "class-variance-authority";
import {Form, useForm} from "react-hook-form";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	Checkbox,
	Container,
	ContentTemplate,
	Icon,
	Input,
	Label,
} from "@shared/ui";
import {
	EmploymentType,
	ModalityType,
	RequiredExperience,
	employmentTypeToLabel,
	modalityTypeToLabel,
	requiredExperienceToLabel,
	useVacancies,
} from "@entities/vacancy";
import {ROUTER_PATHS} from "@app/router/paths";
import {formatPrice} from "@shared/lib/format";

export const VacanciesPage: React.FC = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const initialFilterState = {
		position: "",
		modalityType: [],
		employmentType: [],
		requiredExperience: [],
		salaryFrom: 0,
		salaryTo: Infinity,
	};

	const [filter, setFilter] = useState<{
		position: string;
		modalityType: ModalityType[];
		employmentType: EmploymentType[];
		requiredExperience: RequiredExperience[];
		salaryFrom: number;
		salaryTo: number;
	}>(initialFilterState);

	const {vacancies} = useVacancies();

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
								<BreadcrumbPage>Вакансии</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</Container>
			</section>

			<section className="bg-gradient py-32 md:bg-none md:py-0">
				<Container>
					<div className="flex flex-col items-center space-y-28 md:hidden">
						<h3 className=" font-bold text-40 text-[#fbfbfb] text-center">
							Вакансии
						</h3>

						<div className="max-w-[72rem] w-full relative">
							<Input
								placeholder="Поиск по вакансиям"
								value={filter.position}
								onChange={(event) => {
									setFilter({
										...filter,
										position: event.currentTarget.value,
									});
								}}
								className="!rounded-24 py-16 px-28 !bg-[#fff]"
							/>

							<Icon.Magnifier className="absolute right-28 top-1/2 -translate-y-1/2 w-24 h-auto fill-[#b1b1b1]" />
						</div>
					</div>

					<div className="hidden md:flex flex-col md:border-b border-[#ddd] space-y-12 pb-24">
						<h3 className="text-44 font-bold xs:text-56">
							Вакансии
						</h3>

						<div className="flex items-center space-x-16">
							<Button
								onClick={() => {
									setIsFilterOpen(!isFilterOpen);
								}}
								color="secondary"
								className="inline-flex items-center space-x-12 text-[#434343]"
							>
								<Icon.Filter className="w-20 h-auto" />

								<span className="xs:text-18">
									Фильтр поиска
								</span>
							</Button>

							<Button
								color="secondary"
								type="button"
								onClick={() => {
									setFilter(initialFilterState);
								}}
								className="text-[#ca4040] !border-[#ca4040] xs:text-18"
							>
								Сбросить фильтр
							</Button>
						</div>
					</div>
				</Container>
			</section>

			<section>
				<Container>
					<div className="flex space-x-44 md:space-x-0">
						<div
							className={cx("flex flex-1 flex-col space-y-28", {
								"md:hidden": isFilterOpen,
							})}
						>
							{vacancies
								?.filter((v) => {
									const matchesEmploymentType =
										filter.employmentType.length === 0 ||
										filter.employmentType.some((et) =>
											v.employmentType.includes(et),
										);

									const matchesModalityType =
										filter.modalityType.length === 0 ||
										filter.modalityType.some((mt) =>
											v.modalityType.includes(mt),
										);

									const matchesPosition =
										filter.position === "" ||
										v.position
											.toLowerCase()
											.startsWith(
												filter.position.toLowerCase(),
											);

									const matchesRequiredExperience =
										filter.requiredExperience.length ===
											0 ||
										filter.requiredExperience.includes(
											v.requiredExperience,
										);

									const matchesSalary =
										v.salary >= filter.salaryFrom &&
										v.salary <= filter.salaryTo;

									return (
										matchesEmploymentType &&
										matchesModalityType &&
										matchesPosition &&
										matchesRequiredExperience &&
										matchesSalary
									);
								})
								.map((vacancy) => (
									<div
										key={vacancy.id}
										className="flex flex-col shadow-even-sm bg-[#fff] p-24 rounded-12"
									>
										<div className="flex items-center justify-between mb-16">
											<h4 className="text-28 font-bold xs:text-34">
												{vacancy.position}
											</h4>

											<a
												href={vacancy.link}
												target="_blank"
												className="xs:hidden"
											>
												<Button
													color="gradient"
													className="py-12 rounded-20"
												>
													Откликнуться
												</Button>
											</a>
										</div>

										<div className="flex flex-col space-y-8">
											<div className="flex">
												<div className="inline-flex items-center bg-primary/20 rounded-12 space-x-8 p-8">
													<Icon.Dollar className="w-20 h-auto fill-primary" />

													<span className="font-semibold text-18 text-primary xs:text-22">
														{formatPrice(
															vacancy.salary,
														)}
														₸
													</span>
												</div>
											</div>

											<div className="flex flex-wrap items-center text-16 xs:text-22 text-[#434343] -m-8">
												<div className="flex items-center space-x-8 m-8">
													<Icon.Rise className="size-24 text-[#434343]" />

													<div className="flex flex-wrap -m-4">
														{vacancy.employmentType.map(
															(value) => (
																<span
																	key={value}
																	className="m-4"
																>
																	{employmentTypeToLabel(
																		value,
																	)}
																</span>
															),
														)}
													</div>
												</div>

												<div className="flex items-center space-x-6 m-8">
													<Icon.Suitcase className="size-24 text-[#434343]" />

													<div className="flex flex-wrap">
														<span>
															{requiredExperienceToLabel(
																vacancy?.requiredExperience,
															)}
														</span>
													</div>
												</div>

												<div className="flex items-center space-x-6 m-8">
													<Icon.Light className="size-24 fill-[#434343]" />

													<div className="flex flex-wrap -m-4">
														{vacancy.modalityType.map(
															(value) => (
																<span
																	key={value}
																	className="m-4"
																>
																	{modalityTypeToLabel(
																		value,
																	)}
																</span>
															),
														)}
													</div>
												</div>
											</div>
										</div>

										<div className="flex items-center space-x-12 text-18 xs:text-26 text-[#434343] mt-20">
											<span>{vacancy.company}</span>
											<span>|</span>
											<span>
												{new Date(
													vacancy.createdAt,
												).toLocaleDateString()}
											</span>
										</div>

										<a
											className="hidden xs:block w-full"
											href={vacancy.link}
											target="_blank"
										>
											<Button
												color="gradient"
												className="py-12 rounded-20 mt-40 xs:text-28 w-full"
											>
												Откликнуться
											</Button>
										</a>
									</div>
								))}
						</div>

						<div
							className={cx(
								"h-fit flex flex-col space-y-28 md:hidden",
								{
									"md:!flex md:!mt-0 md:w-full": isFilterOpen,
								},
							)}
						>
							<h5 className="font-bold text-28 xs:text-34 text-[#434343]">
								Фильтр поиска
							</h5>

							<form
								onSubmit={(event) => event.preventDefault()}
								className={cx(
									"max-w-[42rem] w-full flex flex-col space-y-48 bg-[#fff] text-[#434343] shadow-even-sm rounded-16 p-32",
									{
										"md:!max-w-full": isFilterOpen,
									},
								)}
							>
								<div className="flex flex-col space-y-24">
									<div className="flex flex-col space-y-12">
										<label
											htmlFor="position"
											className="text-inherit font-semibold text-22 xs:text-28"
										>
											Специальность
										</label>

										<Input
											id="position"
											placeholder="Введите специальность"
											value={filter.position}
											onChange={(event) => {
												setFilter({
													...filter,
													position:
														event.currentTarget
															.value,
												});
											}}
											className="!rounded-md py-12 px-18 xs:text-26"
										/>
									</div>

									<div className="flex flex-col space-y-14">
										<CategoryTitle>
											Опыт работы
										</CategoryTitle>

										<div className="flex flex-col space-y-12">
											{Object.values(
												RequiredExperience,
											).map((value) => (
												<div
													key={value}
													className="flex items-center space-x-8"
												>
													<Checkbox
														name="requiredExperience"
														id={`requiredExperience:${value}`}
														value={value}
														checked={filter.requiredExperience.includes(
															value,
														)}
														onCheckedChange={(
															checked,
														) => {
															setFilter({
																...filter,
																requiredExperience:
																	checked
																		? [
																				...filter.requiredExperience,
																				value,
																			]
																		: filter.requiredExperience.filter(
																				(
																					v,
																				) =>
																					v !==
																					value,
																			),
															});
														}}
													/>

													<Label
														htmlFor={`requiredExperience:${value}`}
														className="xs:text-24"
													>
														{requiredExperienceToLabel(
															value,
														)}
													</Label>
												</div>
											))}
										</div>
									</div>

									<div className="flex flex-col space-y-14">
										<CategoryTitle>
											Тип занятости
										</CategoryTitle>

										<div className="flex flex-col space-y-12">
											{Object.values(EmploymentType).map(
												(value) => (
													<div
														key={value}
														className="flex items-center space-x-8"
													>
														<Checkbox
															name="employmentType"
															id={`employmentType:${value}`}
															value={value}
															checked={filter.employmentType.includes(
																value,
															)}
															onCheckedChange={(
																checked,
															) => {
																setFilter({
																	...filter,
																	employmentType:
																		checked
																			? [
																					...filter.employmentType,
																					value,
																				]
																			: filter.employmentType.filter(
																					(
																						v,
																					) =>
																						v !==
																						value,
																				),
																});
															}}
														/>

														<Label
															htmlFor={`employmentType:${value}`}
															className="xs:text-24"
														>
															{employmentTypeToLabel(
																value,
															)}
														</Label>
													</div>
												),
											)}
										</div>
									</div>

									<div className="flex flex-col space-y-14">
										<CategoryTitle>
											Формат работы
										</CategoryTitle>

										<div className="flex flex-col space-y-12">
											{Object.values(ModalityType).map(
												(value) => (
													<div
														key={value}
														className="flex items-center space-x-8"
													>
														<Checkbox
															name="modalityType"
															id={`modalityType:${value}`}
															value={value}
															checked={filter.modalityType.includes(
																value,
															)}
															onCheckedChange={(
																checked,
															) => {
																setFilter({
																	...filter,
																	modalityType:
																		checked
																			? [
																					...filter.modalityType,
																					value,
																				]
																			: filter.modalityType.filter(
																					(
																						v,
																					) =>
																						v !==
																						value,
																				),
																});
															}}
														/>

														<Label
															htmlFor={`modalityType:${value}`}
															className="xs:text-24"
														>
															{modalityTypeToLabel(
																value,
															)}
														</Label>
													</div>
												),
											)}
										</div>
									</div>

									<div className="flex flex-col space-y-14">
										<CategoryTitle>
											Ожидаемая з/п
										</CategoryTitle>

										<div className="flex items-center justify-between xs:flex-col xs:space-y-12 xs:items-start">
											<div className="flex w-[calc(50%-0.6rem)] flex-col space-y-4 xs:w-full">
												<Label
													htmlFor="salaryFrom"
													className="xs:text-24"
												>
													От
												</Label>

												<Input
													id="salaryFrom"
													type="number"
													placeholder="Минимальная з/п"
													min={0}
													value={filter.salaryFrom}
													onChange={(event) => {
														setFilter({
															...filter,
															salaryFrom:
																+event
																	.currentTarget
																	.value,
														});
													}}
													className="border rounded-sm py-6 px-12 placeholder:text-sm xs:placeholder:text-20 xs:text-24"
												/>
											</div>

											<div className="flex w-[calc(50%-0.6rem)] flex-col space-y-4 xs:w-full">
												<Label
													htmlFor="salaryTo"
													className="xs:text-24"
												>
													До
												</Label>

												<Input
													id="salaryTo"
													type="number"
													placeholder="Максимальная з/п"
													min={0}
													value={filter.salaryTo}
													onChange={(event) => {
														setFilter({
															...filter,
															salaryTo:
																+event
																	.currentTarget
																	.value,
														});
													}}
													className="border rounded-sm py-6 px-12 placeholder:text-sm xs:placeholder:text-20 xs:text-24"
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="flex flex-col space-y-16">
									<div className="flex items-center space-x-8">
										<Button
											type="submit"
											className="flex flex-1 justify-center px-0 py-12 xs:text-24"
										>
											Применить фильтры
										</Button>

										<Button
											color="secondary"
											className="md:hidden"
										>
											<Icon.Trash className="w-20 h-auto fill-primary py-4" />
										</Button>
									</div>

									<div className="hidden w-full h-2 bg-[#ddd] md:flex" />

									<div className="hidden justify-end md:flex">
										<Button
											onClick={() => {
												setIsFilterOpen(false);
											}}
											color="secondary"
											className="text-primary xs:text-24"
										>
											Закрыть
										</Button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</Container>
			</section>
		</ContentTemplate>
	);
};

const CategoryTitle: React.FC<React.PropsWithChildren> = ({children}) => (
	<h6 className="text-inherit font-semibold text-22 xs:text-28">
		{children}
	</h6>
);
