import {Link} from "wouter";

import {
    Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    AvatarWithFallback,
} from "@shared/ui";
import {AdminButton, AdminTemplate, useAllUsers} from "@features/cms/admin";
import {ROUTER_PATHS} from "@app/router/paths";

export const InternalAdminUsersPage: React.FC = () => {
    const {users} = useAllUsers();

    return (
        <AdminTemplate
            title="Пользователи"
            button={
                <Link to={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_USER}>
                    <AdminButton>Создать пользователя</AdminButton>
                </Link>
            }
        >
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[10%]">ID</TableHead>
                        <TableHead className="w-[35%]">ФИО</TableHead>
                        <TableHead className="w-[35%]">Почта</TableHead>

                        <TableHead className="flex flex-1 justify-end items-center">
                            Действие
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users?.map((user, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="w-[10%]">{idx + 1}</TableCell>

                            <TableCell className="w-[35%]">
                                <span className="flex items-center space-x-12">
                                    <AvatarWithFallback
                                        src={user.avatar}
                                        text={user.firstName[0]}
                                        className="!size-38 !text-16"
                                    />

                                    <span>
                                        {user.firstName} {user.lastName}
                                    </span>
                                </span>
                            </TableCell>

                            <TableCell className="w-[35%]">
                                {user.email}
                            </TableCell>

                            <TableCell>
                                <div className="flex flex-1 justify-end items-center space-x-12">
                                    <Link
                                        to={ROUTER_PATHS.INTERNAL.ADMIN.USER.filled(
                                            user.id,
                                        )}
                                        target="_blank"
                                    >
                                        <Icon.Page className="w-20 h-auto fill-primary" />
                                    </Link>

                                    <button>
                                        <Icon.Trash className="w-20 h-auto fill-primary" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AdminTemplate>
    );
};
