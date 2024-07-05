import {Controller, useForm} from "react-hook-form";
import {useLocation} from "wouter";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {AdminTemplate, useCreateVacancy} from "@features/cms/admin";
import {
	Button,
	Input,
	Label,
	MultiSelect,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shared/ui";
import {
	EmploymentType,
	ModalityType,
	RequiredExperience,
	employmentTypeToLabel,
	modalityTypeToLabel,
	requiredExperienceToLabel,
} from "@entities/vacancy";
import {Nullable} from "@shared/lib/types";
import {ROUTER_PATHS} from "@app/router/paths";

const schema = z.object({
	position: z.string().min(1),
	company: z.string().min(1),
	salary: z.number(),
	employmentType: z.array(z.nativeEnum(EmploymentType)).min(1),
	modalityType: z.array(z.nativeEnum(ModalityType)).min(1),
	requiredExperience: z.nativeEnum(RequiredExperience),
	link: z.string().url(),
});

export const InternalAdminCreateVacancyPage: React.FC = () => {
	const [, navigate] = useLocation();

	const {
		control,
		register,
		handleSubmit,
		formState: {isValid},
	} = useForm<{
		position: Nullable<string>;
		company: Nullable<string>;
		salary: Nullable<number>;
		requiredExperience: Nullable<RequiredExperience>;
		employmentType: EmploymentType[];
		modalityType: ModalityType[];
		link: Nullable<string>;
	}>({
		mode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			position: null,
			company: null,
			salary: null,
			requiredExperience: null,
			employmentType: [],
			modalityType: [],
			link: null,
		},
	});

	const {createVacancy} = useCreateVacancy();

	return (
		<AdminTemplate title="Создание вакансии">
			<form
				onSubmit={handleSubmit((form) => {
					createVacancy({
						company: form.company!,
						position: form.position!,
						employmentType: form.employmentType,
						modalityType: form.modalityType,
						requiredExperience: form.requiredExperience!,
						salary: +form.salary!,
						link: form.link!,
					}).then(() => {
						navigate(ROUTER_PATHS.INTERNAL.ADMIN.VACANCIES);
					});
				})}
				className="flex flex-col space-y-28"
			>
				<div className="flex items-center space-x-28">
					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="position">Название позиции</Label>

						<Input
							id="position"
							placeholder="Введите название позиции"
							{...register("position")}
						/>
					</div>

					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="company">Название компании</Label>

						<Input
							id="company"
							placeholder="Введите название компании"
							{...register("company")}
						/>
					</div>
				</div>

				<div className="flex items-center space-x-28">
					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="salary">Заработная плата</Label>

						<Input
							id="salary"
							placeholder="Введите заработную плату"
							{...register("salary", {
								valueAsNumber: true,
							})}
						/>
					</div>

					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="requiredExperience">
							Необходимый опыт работы
						</Label>

						<Controller
							name="requiredExperience"
							control={control}
							render={({field: {ref, ...field}}) => (
								<Select
									{...field}
									value={field.value || undefined}
									onValueChange={field.onChange}
								>
									<SelectTrigger>
										<SelectValue placeholder="Выберите опыт работы" />
									</SelectTrigger>

									<SelectContent>
										<SelectGroup>
											{Object.values(
												RequiredExperience,
											).map((value) => (
												<SelectItem
													key={value}
													value={value}
												>
													{requiredExperienceToLabel(
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
				</div>

				<div className="flex items-center space-x-28">
					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="employmentType">Тип занятости</Label>

						<Controller
							name="employmentType"
							control={control}
							render={({field}) => (
								<MultiSelect
									options={Object.values(EmploymentType).map(
										(value) => ({
											value,
											label: employmentTypeToLabel(value),
										}),
									)}
									onChange={(selected) => {
										field.onChange(selected);
									}}
									selected={field.value}
									placeholder="Выберите тип занятости"
								/>
							)}
						/>
					</div>

					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="modalityType">Формат работы</Label>

						<Controller
							name="modalityType"
							control={control}
							render={({field}) => (
								<MultiSelect
									options={Object.values(ModalityType).map(
										(value) => ({
											value,
											label: modalityTypeToLabel(value),
										}),
									)}
									onChange={(selected) => {
										field.onChange(selected);
									}}
									selected={field.value}
									placeholder="Выберите формат работы"
								/>
							)}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-8">
					<Label htmlFor="link">Ссылка на вакансию</Label>

					<Input
						id="link"
						type="text"
						placeholder="Вставьте ссылку на вакансию"
						{...register("link")}
					/>
				</div>

				<div className="justify-end flex">
					<Button disabled={!isValid}>Создать</Button>
				</div>
			</form>
		</AdminTemplate>
	);
};
