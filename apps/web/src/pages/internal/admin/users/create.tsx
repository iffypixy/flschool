import {useForm} from "react-hook-form";
import {useLocation} from "wouter";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {AdminTemplate, useCreateUser} from "@features/cms/admin";
import {Button, Input, Label} from "@shared/ui";
import {Nullable} from "@shared/lib/types";
import {ROUTER_PATHS} from "@app/router/paths";

const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    promocode: z.string().nullable(),
});

export const InternalAdminCreateUserPage: React.FC = () => {
    const [, navigate] = useLocation();

    const {
        register,
        handleSubmit,
        formState: {isValid},
    } = useForm<{
        firstName: Nullable<string>;
        lastName: Nullable<string>;
        email: Nullable<string>;
        password: Nullable<string>;
        promocode: Nullable<string>;
    }>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            promocode: null,
        },
    });

    const {createUser} = useCreateUser();

    return (
        <AdminTemplate title="Создание пользователя">
            <form
                onSubmit={handleSubmit((form) => {
                    createUser({
                        firstName: form.firstName!,
                        lastName: form.lastName!,
                        email: form.email!,
                        password: form.password!,
                        promocode: form.promocode!,
                    }).then(() => {
                        toast.success("Создание успешно.");

                        navigate(ROUTER_PATHS.INTERNAL.ADMIN.USERS);
                    });
                })}
                className="flex flex-col space-y-28"
            >
                <div className="flex items-center space-x-28">
                    <div className="flex flex-col space-y-8 w-1/2">
                        <Label htmlFor="firstName">Имя</Label>

                        <Input
                            id="firstName"
                            type="text"
                            placeholder="Введите имя"
                            {...register("firstName")}
                        />
                    </div>

                    <div className="flex flex-col space-y-8 w-1/2">
                        <Label htmlFor="lastName">Фамилия</Label>

                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Введите фамилию"
                            {...register("lastName")}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-8">
                    <Label htmlFor="email">Почта</Label>

                    <Input
                        id="email"
                        type="email"
                        placeholder="Введите почту"
                        {...register("email")}
                    />
                </div>

                <div className="flex items-center space-x-28">
                    <div className="flex flex-col space-y-8 w-1/2">
                        <Label htmlFor="password">Пароль</Label>

                        <Input
                            id="password"
                            type="password"
                            placeholder="Введите пароль"
                            {...register("password")}
                        />
                    </div>

                    <div className="flex flex-col space-y-8 w-1/2">
                        <Label htmlFor="promocode">Промокод</Label>

                        <Input
                            id="promocode"
                            type="text"
                            placeholder="Введите промокод"
                            {...register("promocode")}
                        />
                    </div>
                </div>

                <div className="justify-end flex">
                    <Button disabled={!isValid}>Создать</Button>
                </div>
            </form>
        </AdminTemplate>
    );
};
