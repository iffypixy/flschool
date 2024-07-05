import {useState} from "react";
import {Link} from "wouter";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import toast from "react-hot-toast";

import {Button, ContentTemplate, Icon, Input, Label} from "@shared/ui";
import {Branch} from "@shared/lib/branch";
import {GOOGLE_AUTHORIZATION_URI, useSignUp} from "@features/auth";
import {ROUTER_PATHS} from "@app/router/paths";

const schema = z
	.object({
		firstName: z.string().min(1, {message: "Введите имя"}),
		lastName: z.string().min(1, {message: "Введите фамилию"}),
		email: z.string().email({message: "Некорретная почта"}),
		password: z
			.string()
			.min(8, {message: "Пароль должен содержать минимум 8 символов"}),
		password2: z.string(),
		promocode: z.string(),
	})
	.superRefine(({password2, password}, ctx) => {
		if (password2 !== password) {
			ctx.addIssue({
				code: "custom",
				message: "Пароли не совпадают",
				path: ["password2"],
			});
		}
	});

export const SignUpPage: React.FC = () => {
	const [isPromoInputOpen, setIsPromoInputOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: {isValid, errors},
	} = useForm<{
		firstName: string;
		lastName: string;
		email: string;
		password: string;
		password2: string;
		promocode?: string;
	}>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			password2: "",
			promocode: "",
		},
	});

	const {signUp} = useSignUp();

	return (
		<ContentTemplate
			className="flex items-center justify-center"
			showGoBack={false}
		>
			<div className="flex flex-col space-y-32 items-center">
				<h3 className="font-bold text-36 text-[#000] xs:text-56">
					Регистрация
				</h3>

				<div className="flex flex-col space-y-26 w-[42rem]">
					<form
						onSubmit={handleSubmit((form) => {
							signUp({
								email: form.email,
								firstName: form.firstName,
								lastName: form.lastName,
								password: form.password,
								promocode: form.promocode,
							}).then(() => {
								toast.success("Вы успешно зарегистрировались!");
							});
						})}
						className="flex flex-col space-y-22 w-full"
					>
						<div className="flex flex-col space-y-8">
							<Label htmlFor="firstName" className="xs:text-26">
								Имя
							</Label>

							<div className="flex flex-col space-y-2">
								<Input
									id="firstName"
									type="text"
									placeholder="Алтын"
									className="xs:text-24"
									{...register("firstName", {required: true})}
								/>

								{errors.firstName && (
									<span className="text-14 text-[#E83F36]">
										{errors.firstName.message}
									</span>
								)}
							</div>
						</div>

						<div className="flex flex-col space-y-8">
							<Label htmlFor="lastName" className="xs:text-26">
								Фамилия
							</Label>

							<div className="flex flex-col space-y-2">
								<Input
									id="lastName"
									type="text"
									placeholder="Бактыбекова"
									className="xs:text-24"
									{...register("lastName", {required: true})}
								/>

								{errors.lastName && (
									<span className="text-14 text-[#E83F36]">
										{errors.lastName.message}
									</span>
								)}
							</div>
						</div>

						<div className="flex flex-col space-y-8">
							<Label htmlFor="email" className="xs:text-26">
								Почта
							</Label>

							<div className="flex flex-col space-y-2">
								<Input
									id="email"
									type="email"
									placeholder="jon.smith@email.com"
									className="xs:text-24"
									{...register("email", {required: true})}
								/>

								{errors.email && (
									<span className="text-14 text-[#E83F36]">
										{errors.email.message}
									</span>
								)}
							</div>
						</div>

						<div className="flex flex-col space-y-8">
							<Label htmlFor="password" className="xs:text-26">
								Пароль
							</Label>

							<div className="flex flex-col space-y-2">
								<Input
									id="password"
									type="password"
									placeholder="*********"
									className="xs:text-24"
									{...register("password", {required: true})}
								/>

								{errors.password && (
									<span className="text-14 text-[#E83F36]">
										{errors.password.message}
									</span>
								)}
							</div>
						</div>

						<div className="flex flex-col space-y-8">
							<Label htmlFor="password2" className="xs:text-26">
								Подтверждение пароля
							</Label>

							<div className="flex flex-col space-y-2">
								<Input
									id="password2"
									type="password"
									placeholder="*********"
									className="xs:text-24"
									{...register("password2", {required: true})}
								/>

								{errors.password2 && (
									<span className="text-14 text-[#E83F36]">
										{errors.password2.message}
									</span>
								)}
							</div>
						</div>

						<Branch if={isPromoInputOpen}>
							<div className="flex flex-col space-y-8 animate-in fade-in duration-300">
								<Label
									htmlFor="promocode"
									className="xs:text-26"
								>
									Промокод
								</Label>

								<Input
									id="promocode"
									type="text"
									placeholder="DE1D32V"
									className="xs:text-24"
									{...register("promocode")}
								/>
							</div>

							<button
								type="button"
								onClick={() => {
									setIsPromoInputOpen(true);
								}}
								className="flex items-center space-x-8"
							>
								<Icon.Add className="w-20 h-auto fill-primary" />

								<span className="underline text-[#6f6f6f] underline-offset-2 xs:text-24">
									У меня есть промокод
								</span>
							</button>
						</Branch>

						<Button
							className="py-14 text-18 xs:text-26"
							disabled={!isValid}
						>
							Создать аккаунт
						</Button>
					</form>

					<div className="flex flex-col space-y-22 xs:text-24">
						<div className="flex flex-col space-y-8 items-center">
							<span className="text-[#888]">
								или войти с помощью
							</span>

							<a
								href={GOOGLE_AUTHORIZATION_URI}
								className="bg-[#eee] w-fit rounded-8 py-16 px-38 flex items-center justify-center"
							>
								<Icon.Social.Google className="w-32 h-auto" />
							</a>
						</div>

						<div className="text-center space-x-4 font-medium">
							<span className="text-[#888]">Есть аккаунт?</span>

							<Link to={ROUTER_PATHS.SIGN_IN}>
								<span className="text-primary">Логин</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</ContentTemplate>
	);
};
