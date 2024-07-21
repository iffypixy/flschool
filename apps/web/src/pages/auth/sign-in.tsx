import {Link, useLocation} from "wouter";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";

import {Button, ContentTemplate, Icon, Input, Label} from "@shared/ui";
import {GOOGLE_AUTHORIZATION_URI, useSignIn} from "@features/auth";
import {ROUTER_PATHS} from "@app/router/paths";
import {ViewerRole} from "@entities/viewer";

export const SignInPage: React.FC = () => {
    const [, navigate] = useLocation();

    const {
        register,
        handleSubmit,
        formState: {isValid},
    } = useForm<{
        email: string;
        password: string;
    }>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {signIn} = useSignIn();

    return (
        <ContentTemplate
            className="flex items-center justify-center"
            showGoBack={false}
        >
            <div className="flex flex-col space-y-32 items-center">
                <h3 className="font-bold text-36 text-[#000] xs:text-56">
                    Авторизация
                </h3>

                <div className="flex flex-col space-y-26 w-[42rem]">
                    <form
                        onSubmit={handleSubmit((form) => {
                            signIn({
                                email: form.email,
                                password: form.password,
                            }).then(({data}) => {
                                toast.success("Вы успешно авторизовались!");

                                const redirectMap: Record<ViewerRole, string> =
                                    {
                                        ADMIN: ROUTER_PATHS.INTERNAL.ADMIN.HOME,
                                        EXPERT: ROUTER_PATHS.INTERNAL.EXPERT
                                            .HOME,
                                        USER: ROUTER_PATHS.HOME,
                                    };

                                navigate(redirectMap[data.credentials.role]);
                            });
                        })}
                        className="flex flex-col space-y-22 w-full"
                    >
                        <div className="flex flex-col space-y-8">
                            <Label htmlFor="email" className="xs:text-26">
                                Почта
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="jon.smith@email.com"
                                className="xs:text-24"
                                {...register("email", {required: true})}
                            />
                        </div>

                        <div className="flex flex-col space-y-8">
                            <Label htmlFor="password" className="xs:text-26">
                                Пароль
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                placeholder="*********"
                                className="xs:text-24"
                                {...register("password", {required: true})}
                            />
                        </div>

                        <Button
                            disabled={!isValid}
                            className="py-14 text-18 xs:text-26"
                        >
                            Войти
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
                            <span className="text-[#888]">Нет аккаунта?</span>

                            <Link to={ROUTER_PATHS.SIGN_UP}>
                                <span className="text-primary">
                                    Зарегистрируйтесь
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ContentTemplate>
    );
};
