import {Controller, useForm} from "react-hook-form";
import {Tag} from "emblor";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useDebounce} from "use-debounce";
import {useLocation} from "wouter";
import toast from "react-hot-toast";

import {
    AdminTemplate,
    useCreateCourse,
    useSearchExperts,
} from "@features/cms/admin";
import {
    Input,
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    TagInput,
    AutoComplete,
    Button,
} from "@shared/ui";
import {Nullable} from "@shared/lib/types";
import {CourseType, courseTypeToLabel} from "@entities/course";
import {Language, languageToLabel} from "@entities/language";
import {Expert} from "@entities/expert";
import {UploadedFile} from "@entities/file";
import {UploadZone, fileSchema} from "@features/upload";
import {ROUTER_PATHS} from "@app/router/paths";

const schema = z.object({
    type: z.nativeEnum(CourseType),
    name: z.string().min(1),
    language: z.nativeEnum(Language),
    hook: z.string().min(1),
    audience: z.array(z.object({}).required()).min(1),
    price: z.number().nullable(),
    description: z.string().min(1),
    preview: fileSchema.required(),
    duration: z.number(),
    author: z
        .object({
            search: z.string(),
            data: z.object({}).required(),
        })
        .required(),
});

export const InternalAdminCreateCoursePage: React.FC = () => {
    const [, navigate] = useLocation();

    const {
        control,
        register,
        formState,
        handleSubmit,
        setValue,
        watch,
        getValues,
    } = useForm<{
        type: Nullable<CourseType>;
        name: Nullable<string>;
        language: Nullable<Language>;
        hook: Nullable<string>;
        audience: Tag[];
        description: Nullable<string>;
        duration: Nullable<number>;
        price: Nullable<number>;
        preview: Nullable<UploadedFile>;
        author: {
            search: string;
            data: Nullable<Expert>;
        };
    }>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: {
            type: null,
            name: null,
            language: null,
            hook: null,
            audience: [],
            description: null,
            duration: null,
            price: null,
            preview: null,
            author: {
                search: "",
                data: null,
            },
        },
    });

    const [author] = watch(["author"]);

    const [search] = useDebounce(author.search, 300);
    const {experts, isFetching: areExpertsFetching} = useSearchExperts({
        query: search,
    });

    const {createCourse} = useCreateCourse();

    return (
        <AdminTemplate title="Создание курса">
            <form
                onSubmit={handleSubmit(() => {
                    const form = getValues();

                    createCourse({
                        type: form.type!,
                        name: form.name!,
                        language: form.language!,
                        price: form.price!,
                        audience: form.audience.map((t) => t.text),
                        hook: form.hook!,
                        duration: form.duration!,
                        description: form.description!,
                        previewFileId: form.preview!.id,
                        authorId: form.author.data!.id,
                    }).then(() => {
                        toast.success("Создание успешно.");

                        navigate(ROUTER_PATHS.INTERNAL.ADMIN.COURSES);
                    });
                })}
                className="flex flex-col space-y-48"
            >
                <div className="flex flex-col bg-[#fff] shadow-even-sm space-y-36 p-36 rounded-lg">
                    <h5 className="text-28 font-semibold">Информация</h5>

                    <div className="flex flex-col space-y-24">
                        <div className="flex items-center space-x-28">
                            <div className="flex flex-col space-y-8 w-1/2">
                                <Label>Тип курса</Label>

                                <Controller
                                    name="type"
                                    control={control}
                                    render={({field: {ref, ...field}}) => (
                                        <Select
                                            {...field}
                                            value={field.value || undefined}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите тип курса" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    {Object.values(
                                                        CourseType,
                                                    ).map((value) => (
                                                        <SelectItem
                                                            key={value}
                                                            value={value}
                                                        >
                                                            {courseTypeToLabel(
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

                            <div className="flex flex-col space-y-8 w-1/2">
                                <Label htmlFor="name">Название</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Введите название курса"
                                    {...register("name")}
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-28">
                            <div className="flex flex-col space-y-8 w-1/2">
                                <Label>Язык курса</Label>

                                <Controller
                                    name="language"
                                    control={control}
                                    render={({field: {ref, ...field}}) => (
                                        <Select
                                            {...field}
                                            value={field.value || undefined}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите язык курса" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    {Object.values(
                                                        Language,
                                                    ).map((value) => (
                                                        <SelectItem
                                                            key={value}
                                                            value={value}
                                                        >
                                                            {languageToLabel(
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

                            <div className="flex flex-col space-y-8 w-1/2">
                                <Label htmlFor="price">
                                    Цена{" "}
                                    <span className="text-[0.75em] text-[#434343]">
                                        (опционально, если не языковой)
                                    </span>
                                </Label>

                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="Введите цену курса"
                                    {...register("price", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-8">
                            <Label htmlFor="duration">
                                Длительность{" "}
                                <span className="text-[0.75em] text-[#434343]">
                                    (в месяцах)
                                </span>
                            </Label>

                            <Input
                                id="duration"
                                type="number"
                                placeholder="Введите длительность курса"
                                {...register("duration", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>

                        <div className="flex flex-col space-y-8">
                            <Label>
                                Аудитория{" "}
                                <span className="text-[0.75em] text-[#434343]">
                                    (добавлять через Enter)
                                </span>
                            </Label>

                            <Controller
                                name="audience"
                                control={control}
                                render={({field}) => (
                                    <TagInput
                                        placeholder="Введите аудиторию курса"
                                        tags={field.value}
                                        setTags={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        <div className="flex flex-col space-y-8">
                            <Label htmlFor="hook">Хук</Label>

                            <Input
                                id="hook"
                                type="text"
                                placeholder="Введите вызывающее описание"
                                {...register("hook")}
                            />
                        </div>

                        <div className="flex flex-col space-y-8">
                            <Label htmlFor="description">Описание</Label>

                            <Textarea
                                id="description"
                                placeholder="Введите описание курса"
                                {...register("description")}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-[#fff] shadow-even-sm space-y-36 p-36 rounded-lg">
                    <h5 className="text-28 font-semibold">Видео-превью</h5>

                    <div className="flex flex-col space-y-24">
                        <UploadZone
                            accept="video/mp4,video/x-m4v,video/*"
                            onUpload={(file) =>
                                setValue("preview", file, {
                                    shouldValidate: true,
                                })
                            }
                        >
                            Выберите файл для видео-превью
                        </UploadZone>
                    </div>
                </div>

                <div className="flex flex-col bg-[#fff] shadow-even-sm space-y-36 p-36 rounded-lg">
                    <h5 className="text-28 font-semibold">Автор курса</h5>

                    <div className="flex flex-col space-y-24">
                        <Controller
                            name="author"
                            control={control}
                            render={({field}) => (
                                <AutoComplete
                                    isLoading={areExpertsFetching}
                                    options={
                                        experts?.map((e) => ({
                                            value: e.id,
                                            label: `${e.firstName} ${e.lastName}`,
                                        })) || []
                                    }
                                    placeholder="Найдите эксперта"
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
                                                experts?.find(
                                                    (e) => e.id === value.value,
                                                ) || null,
                                        });
                                    }}
                                    value={
                                        author.data
                                            ? {
                                                  label: `${author.data.firstName} ${author.data.lastName}`,
                                                  value: author.data.id,
                                              }
                                            : undefined
                                    }
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end items-center">
                    <Button disabled={!formState.isValid}>Создать</Button>
                </div>
            </form>
        </AdminTemplate>
    );
};
