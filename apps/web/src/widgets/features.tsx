import {cx} from "class-variance-authority";

interface FeatureProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    highlighted?: number;
}

export const Feature: React.FC<FeatureProps> = ({
    title,
    description,
    icon,
    highlighted = 0,
}) => {
    const words = title.split(" ");

    return (
        <div className="w-[48%] flex space-x-24 my-[4rem] xs:w-full">
            <div className="flex justify-start items-start [&>svg]:min-w-[5rem] [&>svg]:max-w-[5rem] [&>svg]:min-h-[5rem] [&>svg]:max-h-[5rem]">
                {icon}
            </div>

            <div className="flex flex-col space-y-8">
                <h6 className="font-bold text-[3rem] text-[#434343] leading-[3.4rem]">
                    {words.map((word, idx) => (
                        <span
                            key={idx}
                            className={cx({
                                ["text-primary"]: idx < highlighted,
                            })}
                        >
                            {word}{" "}
                        </span>
                    ))}
                </h6>

                <span className="text-[2.4rem] font-medium">{description}</span>
            </div>
        </div>
    );
};
