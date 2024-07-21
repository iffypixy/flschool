import {cx} from "class-variance-authority";
import {
    Delimiter,
    TagInput as Emblor,
    TagInputProps as EmblorProps,
} from "emblor";

import {PropsWithClassName} from "@shared/lib/types";

interface TagInputProps {
    tags: EmblorProps["tags"];
    setTags: EmblorProps["setTags"];
    placeholder?: EmblorProps["placeholder"];
}

export const TagInput: React.FC<TagInputProps> = (props) => (
    <Emblor
        {...props}
        styleClasses={{
            inlineTagsContainer:
                "rounded-lg px-20 py-12 gap-4 text-[#151515] shadow-sm",
            input: "text-md shadow-none",
            tag: {
                body: "bg-[#fff] text-md h-fit border inline-flex rounded-sm p-2 gap-4",
            },
        }}
        activeTagIndex={null}
        setActiveTagIndex={() => null}
        delimiter={Delimiter.Enter}
    />
);

interface ReadonlyTagInputProps extends PropsWithClassName {
    tags: string[];
}

export const ReadonlyTagInput: React.FC<ReadonlyTagInputProps> = ({
    tags,
    className,
}) => (
    <div
        className={cx(
            "rounded-lg px-20 py-12 gap-4 text-[#151515] shadow-sm border flex flex-wrap",
            className,
        )}
    >
        {tags.map((tag, idx) => (
            <span
                key={idx}
                className="bg-[#fff] border inline-flex rounded-sm p-2"
            >
                {tag}
            </span>
        ))}
    </div>
);
