import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Container,
    ContentTemplate,
    Label,
    AvatarWithFallback,
} from "@shared/ui";
import {Upload} from "@shared/lib/upload";
import {useUploadFile} from "@features/upload";
import {useLogout} from "@features/auth";
import {useEditAvatar, useMyPromocode} from "@entities/profile";
import {useViewer} from "@entities/viewer";

export const ProfilePage: React.FC = () => {
    const {viewer} = useViewer();
    const {promocode} = useMyPromocode();

    const {uploadFile} = useUploadFile();
    const {editAvatar} = useEditAvatar();
    const {logout} = useLogout();

    return (
        <ContentTemplate className="flex flex-col space-y-40">
            <section>
                <Container>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/profile">
                                    {viewer?.firstName} {viewer?.lastName}
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Профиль</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </Container>
            </section>

            <section>
                <Container>
                    <div className="flex flex-col space-y-38">
                        <h3 className="font-bold text-40 xs:text-32">
                            Добро пожаловать, {viewer?.firstName}!
                        </h3>

                        <div className="flex bg-[#fff] shadow-even-sm p-32 rounded-16 xs:flex-col xs:items-center xs:py-68">
                            <Upload
                                onUpload={(file) => {
                                    uploadFile({file}).then(({fileId}) => {
                                        editAvatar({avatarFileId: fileId});
                                    });
                                }}
                                className="mr-56 xs:mr-0 xs:mb-56"
                            >
                                <div className="size-[18rem] xs:size-[14rem] relative rounded-full overflow-hidden group cursor-pointer">
                                    <AvatarWithFallback
                                        src={viewer?.avatar}
                                        text={viewer?.firstName[0]}
                                        className="!w-full !h-full !text-38"
                                    />

                                    <div className="absolute left-0 top-0 w-full h-full group-hover:bg-[rgba(0,0,0,0.5)]" />
                                </div>
                            </Upload>

                            <div className="flex flex-1 justify-between">
                                <div className="flex flex-col space-y-24 xs:items-center">
                                    <h5 className="font-semibold text-32 xs:text-44">
                                        {viewer?.firstName} {viewer?.lastName}
                                    </h5>

                                    <div className="flex flex-col space-y-4 [&_label]:text-[#434343] [&_label]:w-[14rem] xs:[&_label]:w-[18rem]">
                                        <div className="flex items-center space-x-12">
                                            <Label className="xs:text-24">
                                                Почта
                                            </Label>

                                            <span className="text-20 xs:text-26">
                                                {viewer?.email}
                                            </span>
                                        </div>

                                        {/* <div className="flex items-center space-x-12">
											<Label className="xs:text-24">
												Пароль
											</Label>

											<span className="text-20 xs:text-26">
												***********
											</span>
										</div> */}

                                        <div className="flex items-center space-x-12">
                                            <Label className="xs:text-24">
                                                Промокод
                                            </Label>

                                            <span className="text-20 xs:text-26">
                                                {promocode}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                logout();
                            }}
                            className="w-fit"
                        >
                            <span className="underline underline-offset-4 text-20 xs:text-28 font-medium">
                                Выйти из аккаунта
                            </span>
                        </button>
                    </div>
                </Container>
            </section>
        </ContentTemplate>
    );
};
