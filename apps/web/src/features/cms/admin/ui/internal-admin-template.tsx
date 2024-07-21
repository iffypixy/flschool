import {Link, useLocation} from "wouter";
import {cx} from "class-variance-authority";

import {Button, Container, Icon, Logo} from "@shared/ui";
import {ROUTER_PATHS} from "@app/router/paths";
import {useLogout} from "@features/auth";

interface AdminTemplateProps extends React.PropsWithChildren {
    title?: string;
    button?: React.ReactNode;
}

export const AdminTemplate: React.FC<AdminTemplateProps> = ({
    title,
    children,
    button,
}) => {
    const [location] = useLocation();

    const {logout} = useLogout();

    return (
        <div className="flex h-screen">
            <aside className="max-w-[32rem] w-full h-full flex flex-col bg-[#fdfdfd] border-r-2 border-[#eceef6] justify-between p-34">
                <div className="flex flex-col space-y-32">
                    <Link to="/" className="flex items-center space-x-12">
                        <Logo />

                        <h6 className="bg-gradient bg-clip-text text-transparent font-bold text-24 leading-10">
                            Freelance school
                        </h6>
                    </Link>

                    <div className="flex flex-col space-y-12">
                        {[
                            {
                                label: "Все пользователи",
                                path: ROUTER_PATHS.INTERNAL.ADMIN.USERS,
                                Icon: Icon.Admin.Users,
                            },
                            {
                                label: "Заявки на консультацию",
                                path: ROUTER_PATHS.INTERNAL.ADMIN
                                    .CONSULTATION_REQUESTS,
                                Icon: Icon.Admin.Requests,
                            },
                            {
                                label: "Наши курсы",
                                path: ROUTER_PATHS.INTERNAL.ADMIN.COURSES,
                                Icon: Icon.Admin.Courses,
                            },
                            {
                                label: "Эксперты",
                                path: ROUTER_PATHS.INTERNAL.ADMIN.EXPERTS,
                                Icon: Icon.Admin.Experts,
                            },
                            {
                                label: "Выпускники",
                                path: ROUTER_PATHS.INTERNAL.ADMIN.ALUMNI,
                                Icon: Icon.Admin.Alumni,
                            },
                            {
                                label: "Вакансии",
                                path: ROUTER_PATHS.INTERNAL.ADMIN.VACANCIES,
                                Icon: Icon.Admin.Vacancies,
                            },
                            {
                                label: "Отзывы",
                                path: ROUTER_PATHS.INTERNAL.ADMIN.REVIEWS,
                                Icon: Icon.Admin.Reviews,
                            },
                        ].map(({label, path, Icon}, idx) => (
                            <Link
                                key={idx}
                                to={path}
                                className={cx(
                                    "flex items-center space-x-16 p-12 rounded-8 group hover:bg-[#efefef]",
                                    {
                                        "bg-[#efefef]": path === location,
                                    },
                                )}
                            >
                                <Icon
                                    className={cx(
                                        "size-24 text-[#a6acb8] group-hover:text-primary",
                                        {
                                            "!text-primary": path === location,
                                        },
                                    )}
                                />

                                <span className="text-[#61677f] font-medium text-16">
                                    {label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => {
                        logout();
                    }}
                    className="flex items-center space-x-16"
                >
                    <Icon.Nav.Exit className="size-24 text-[#a6acb8] group-hover:text-primary" />

                    <span className="text-[#61677f] font-medium text-16">
                        Выйти
                    </span>
                </button>
            </aside>

            <main className="flex flex-1 bg-[#f8f9ff] overflow-auto">
                <Container>
                    <div className="relative">
                        <div className="absolute top-34 right-0">{button}</div>

                        <div className="flex flex-col space-y-52 py-96">
                            {title && (
                                <h1 className="text-34 font-bold">{title}</h1>
                            )}

                            {children}
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export const AdminButton: React.FC<React.ComponentProps<typeof Button>> = ({
    className,
    children,
    ...props
}) => (
    <Button
        className={cx(
            "flex items-center space-x-12 shadow-even-md py-12 px-32 text-16",
            className,
        )}
        {...props}
    >
        <Icon.Add className="w-22 h-auto fill-[#fbfbfb]" />

        <span>{children}</span>
    </Button>
);
