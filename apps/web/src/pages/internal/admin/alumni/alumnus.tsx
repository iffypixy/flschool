import {Controller, useForm} from "react-hook-form";
import {useDebounce} from "use-debounce";
import {useLocation, useParams} from "wouter";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {
	Button,
	Input,
	Label,
	AvatarWithFallback,
	AutoComplete,
	Fullscreen,
	Center,
	Loader,
} from "@shared/ui";
import {Upload} from "@shared/lib/upload";
import {Nullable} from "@shared/lib/types";
import {
	useSearchCourses,
	AdminTemplate,
	useAlumnus,
	useEditAlumnus,
	useDeleteAlumnus,
} from "@features/cms/admin";
import {UploadZone, fileSchema, useUploadFile} from "@features/upload";
import {Course} from "@entities/course";
import {UploadedFile} from "@entities/file";
import {ROUTER_PATHS} from "@app/router/paths";

const schema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	workplace: z.string().min(1),
	course: z.object({
		search: z.string(),
		data: z
			.object({
				id: z.string(),
			})
			.required(),
	}),
	about: z.string().min(1),
	avatar: fileSchema.required(),
	income: fileSchema.required(),
	certificate: fileSchema.required(),
	review: fileSchema.required(),
});

export const InternalAdminAlumnusPage: React.FC = () => {
	const [, navigate] = useLocation();

	const {id} = useParams() as {id: string};
	const {alumnus, isFetching} = useAlumnus(id);

	const {register, handleSubmit, setValue, watch, formState, control} =
		useForm<{
			avatar: Nullable<UploadedFile>;
			firstName: Nullable<string>;
			lastName: Nullable<string>;
			workplace: Nullable<string>;
			about: Nullable<string>;
			course: {
				search: string;
				data: Nullable<Course>;
			};
			income: Nullable<UploadedFile>;
			certificate: Nullable<UploadedFile>;
			review: Nullable<UploadedFile>;
		}>({
			mode: "onChange",
			resolver: zodResolver(schema),
			values: {
				avatar: alumnus?.avatar || null,
				firstName: alumnus?.firstName || null,
				lastName: alumnus?.lastName || null,
				workplace: alumnus?.workplace || null,
				about: alumnus?.about || null,
				course: {
					search: "",
					data: alumnus?.course || null,
				},
				income: alumnus?.income || null,
				certificate: alumnus?.certificate || null,
				review: alumnus?.review || null,
			},
		});

	const [course, avatar, firstName, income, certificate, review] = watch([
		"course",
		"avatar",
		"firstName",
		"income",
		"certificate",
		"review",
	]);

	const [search] = useDebounce(course.search, 300);
	const {courses, isFetching: areCoursesFetching} = useSearchCourses({
		query: search,
	});

	const {uploadFile} = useUploadFile();
	const {editAlumnus} = useEditAlumnus();
	const {deleteAlumnus} = useDeleteAlumnus();

	if (isFetching)
		return (
			<Fullscreen>
				<Center>
					<Loader />
				</Center>
			</Fullscreen>
		);

	return (
		<AdminTemplate title="Редактирование выпускника">
			<form
				onSubmit={handleSubmit((form) => {
					editAlumnus({
						id: alumnus!.id,
						avatarFileId: form.avatar!.id,
						firstName: form.firstName!,
						lastName: form.lastName!,
						about: form.about!,
						workplace: form.workplace!,
						courseId: form.course.data!.id,
						incomeFileId: form.income!.id,
						certificateFileId: form.certificate!.id,
						reviewFileId: form.review!.id,
					}).then(() => {
						navigate(ROUTER_PATHS.INTERNAL.ADMIN.ALUMNI);
					});
				})}
				className="flex flex-col space-y-28"
			>
				<Upload
					accept="image/png, image/gif, image/jpeg"
					onUpload={(file) => {
						uploadFile({file}).then(({fileId, url}) => {
							setValue(
								"avatar",
								{id: fileId, url, name: file.name},
								{
									shouldValidate: true,
								},
							);
						});
					}}
					className="mr-56 xs:mr-0 xs:mb-56"
				>
					<div className="size-[14rem] xs:size-[14rem] relative rounded-full overflow-hidden group cursor-pointer">
						<AvatarWithFallback
							src={avatar?.url}
							text={firstName?.[0]}
							className="!w-full !h-full !text-38"
						/>

						<div className="absolute left-0 top-0 w-full h-full group-hover:bg-[rgba(0,0,0,0.5)]" />
					</div>
				</Upload>

				<div className="flex items-center space-x-28">
					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="firstName">Имя</Label>
						<Input
							id="firstName"
							placeholder="Введите имя"
							{...register("firstName")}
						/>
					</div>

					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="lastName">Фамилия</Label>
						<Input
							id="lastName"
							placeholder="Введите фамилию"
							{...register("lastName")}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-8">
					<Label htmlFor="workplace">Место работы</Label>
					<Input
						id="workplace"
						placeholder="Введите место работы"
						{...register("workplace")}
					/>
				</div>

				<div className="flex flex-col space-y-8">
					<Label htmlFor="course">Выпускник курса</Label>

					<Controller
						key={course.data?.id}
						name="course"
						control={control}
						render={({field}) => (
							<AutoComplete
								isLoading={areCoursesFetching}
								options={
									courses?.map((c) => ({
										value: c.id,
										label: c.name,
									})) || []
								}
								placeholder="Найдите курс"
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
											courses?.find(
												(c) => c.id === value.value,
											) || null,
									});
								}}
								value={
									course.data
										? {
												label: course.data.name,
												value: course.data.id,
											}
										: undefined
								}
							/>
						)}
					/>
				</div>

				<div className="flex flex-col space-y-8">
					<Label>О себе</Label>

					<textarea
						{...register("about")}
						placeholder="Введите инфо о себе"
						className="resize-none p-16 text-18 rounded-12 min-h-[22rem] border-2 border-[#eee] bg-transparent outline-none"
					/>
				</div>

				<div className="flex flex-col space-y-8">
					<Label>Заработок</Label>

					<UploadZone
						key={income?.name}
						accept="image/png, image/gif, image/jpeg"
						fileName={income?.name}
						onUpload={(file) => {
							setValue("income", file, {
								shouldValidate: true,
							});
						}}
					>
						Выберите файл, подтверждающий заработок
					</UploadZone>
				</div>

				<div className="flex flex-col space-y-8">
					<Label>Сертификат</Label>

					<UploadZone
						key={certificate?.name}
						accept="image/png, image/gif, image/jpeg"
						fileName={certificate?.name}
						onUpload={(file) => {
							setValue("certificate", file, {
								shouldValidate: true,
							});
						}}
					>
						Выберите файл-сертификат
					</UploadZone>
				</div>

				<div className="flex flex-col space-y-8">
					<Label>Видео-отзыв</Label>

					<UploadZone
						key={review?.name}
						accept="video/mp4,video/x-m4v,video/*"
						fileName={review?.name}
						onUpload={(file) => {
							setValue("review", file, {
								shouldValidate: true,
							});
						}}
					>
						Выберите файла видео-отзыва
					</UploadZone>
				</div>

				<div className="justify-end flex items-center space-x-12">
					<Button
						onClick={() => {
							deleteAlumnus(alumnus!.id).then(() => {
								navigate(ROUTER_PATHS.INTERNAL.ADMIN.ALUMNI);
							});
						}}
						color="error"
						type="button"
					>
						Удалить
					</Button>

					<Button disabled={!formState.isValid}>Редактировать</Button>
				</div>
			</form>
		</AdminTemplate>
	);
};
