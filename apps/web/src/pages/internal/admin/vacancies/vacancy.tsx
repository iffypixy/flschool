import {Controller, useForm} from "react-hook-form";
import {useLocation, useParams} from "wouter";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
    AdminTemplate,
    useDeleteVacancy,
    useEditVacancy,
    useVacancy,
} from "@features/cms/admin";
import {
    Button,
    Center,
    Fullscreen,
    Input,
    Label,
    Loader,
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

export const InternalAdminVacancyPage: React.FC = () => {
    const [, navigate] = useLocation();

    const {id} = useParams() as {id: string};
    const {vacancy, isFetching} = useVacancy(id);

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
        values: {
            position: vacancy?.position || null,
            company: vacancy?.company || null,
            salary: vacancy?.salary || null,
            requiredExperience: vacancy?.requiredExperience || null,
            employmentType: vacancy?.employmentType || [],
            modalityType: vacancy?.modalityType || [],
            link: vacancy?.link || null,
        },
    });

    const {editVacancy} = useEditVacancy();
    const {deleteVacancy} = useDeleteVacancy();

    if (isFetching)
        return (
            <Fullscreen>
                <Center>
                    <Loader />
                </Center>
            </Fullscreen>
        );

    return (
        <AdminTemplate title="Редактирование вакансии">
            <form
                onSubmit={handleSubmit((form) => {
                    editVacancy({
                        id: vacancy!.id,
                        company: form.company!,
                        position: form.position!,
                        employmentType: form.employmentType,
                        modalityType: form.modalityType,
                        requiredExperience: form.requiredExperience!,
                        salary: +form.salary!,
                        link: form.link!,
                    }).then(() => {
                        toast.success("Редактирование успешно.");

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
                                                <SelectItem value={value}>
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

                <div className="justify-end flex space-x-12 items-center">
                    <Button
                        type="button"
                        color="error"
                        onClick={() => {
                            deleteVacancy(vacancy!.id).then(() => {
                                navigate(ROUTER_PATHS.INTERNAL.ADMIN.VACANCIES);
                            });
                        }}
                    >
                        Удалить
                    </Button>

                    <Button disabled={!isValid}>Редактировать</Button>
                </div>
            </form>
        </AdminTemplate>
    );
};
