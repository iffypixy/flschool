import {useForm} from "react-hook-form";
import {useLocation, useParams} from "wouter";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {fileSchema, useUploadFile} from "@features/upload";
import {
	AdminTemplate,
	useExpert,
	useEditExpert,
	useDeleteExpert,
} from "@features/cms/admin";
import {
	Button,
	Input,
	Label,
	Textarea,
	AvatarWithFallback,
	Fullscreen,
	Center,
	Loader,
	Spinner,
} from "@shared/ui";
import {Upload} from "@shared/lib/upload";
import {ROUTER_PATHS} from "@app/router/paths";
import {Nullable} from "@shared/lib/types";
import {UploadedFile} from "@entities/file";
import {Branch} from "@shared/lib/branch";

const schema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	about: z.string().min(1),
	avatar: fileSchema.nullable(),
});

export const InternalAdminExpertPage: React.FC = () => {
	const [, navigate] = useLocation();

	const {id} = useParams() as {id: string};
	const {expert, isFetching} = useExpert(id);

	const {editExpert} = useEditExpert();
	const {deleteExpert, isPending: isDeleting} = useDeleteExpert();
	const {uploadFile} = useUploadFile();

	const {register, watch, formState, handleSubmit, setValue} = useForm<{
		firstName: Nullable<string>;
		lastName: Nullable<string>;
		email: Nullable<string>;
		about: Nullable<string>;
		avatar: Nullable<UploadedFile>;
		password: Nullable<string>;
	}>({
		mode: "onChange",
		resolver: zodResolver(schema),
		values: {
			firstName: expert?.firstName || null,
			lastName: expert?.lastName || null,
			email: expert?.email || null,
			about: expert?.about || null,
			password: expert?.plainPassword || null,
			avatar: expert?.avatar || null,
		},
	});

	const [avatar, firstName] = watch(["avatar", "firstName"]);

	if (isFetching)
		return (
			<Fullscreen>
				<Center>
					<Loader />
				</Center>
			</Fullscreen>
		);

	return (
		<AdminTemplate title="Редактирование эксперта">
			<form
				onSubmit={handleSubmit((form) => {
					return editExpert({
						id: expert!.id,
						firstName: form.firstName!,
						lastName: form.lastName!,
						about: form.about!,
						avatarFileId: form.avatar?.id,
					}).then(() => {
						navigate(ROUTER_PATHS.INTERNAL.ADMIN.EXPERTS);
					});
				})}
				className="flex flex-col space-y-28"
			>
				<Upload
					accept="image/png, image/gif, image/jpeg"
					onUpload={(file) => {
						uploadFile({file}).then(({url, fileId}) => {
							setValue(
								"avatar",
								{
									id: fileId,
									url,
									name: file.name,
								},
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

				<div className="flex items-center space-x-28">
					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="email">Почта</Label>

						<Input
							id="email"
							placeholder="Введите почту"
							{...register("email")}
							disabled
						/>
					</div>

					<div className="flex flex-col space-y-8 w-1/2">
						<Label htmlFor="password">Пароль</Label>

						<Input
							id="password"
							placeholder="Введите пароль"
							{...register("password")}
							disabled
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-8">
					<Label>О себе</Label>

					<Textarea
						{...register("about")}
						placeholder="Введите инфо о себе"
						className="resize-none p-16 text-18 rounded-12 min-h-[22rem] border-2 border-[#eee] bg-transparent outline-none"
					/>
				</div>

				<div className="justify-end flex items-center space-x-12">
					<Branch if={isDeleting}>
						<Spinner />

						<Button
							type="button"
							color="error"
							onClick={() => {
								deleteExpert(expert!.id).then(() => {
									navigate(
										ROUTER_PATHS.INTERNAL.ADMIN.EXPERTS,
									);
								});
							}}
						>
							Удалить
						</Button>
					</Branch>

					<Branch if={formState.isSubmitting}>
						<Spinner />

						<Button disabled={!formState.isValid}>
							Редактировать
						</Button>
					</Branch>
				</div>
			</form>
		</AdminTemplate>
	);
};
