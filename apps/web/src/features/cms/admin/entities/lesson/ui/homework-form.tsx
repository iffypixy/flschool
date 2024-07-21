import {useEffect, useState} from "react";
import * as RXTabs from "@radix-ui/react-tabs";

import {HomeworkType, HomeworkWithTestAnswers} from "@entities/homework";
import {TestWithAnswers} from "@entities/test";
import {
    Button,
    Icon,
    Input,
    Label,
    RadioGroup,
    RadioGroupItem,
    Textarea,
} from "@shared/ui";

export const HomeworkForm: React.FC<{
    onChange?: (homework: HomeworkWithTestAnswers) => void;
    homework?: HomeworkWithTestAnswers;
    disabled?: boolean;
}> = ({onChange, homework, disabled}) => {
    const [tab, setTab] = useState(homework?.type || HomeworkType.TEXT);

    const [text, setText] = useState(homework?.text || "");
    const [test, setTest] = useState<TestWithAnswers>(homework?.test || []);

    useEffect(() => {
        const hwText = tab === HomeworkType.TEST ? "" : text;
        const hwTest = tab === HomeworkType.TEXT ? [] : test;

        const trimmedHwTest = hwTest.filter((q) => !!q.text);

        onChange?.({
            type: tab,
            text: hwText,
            test: trimmedHwTest,
        });
    }, [tab, text, test]);

    return (
        <RXTabs.Root
            defaultValue={tab}
            onValueChange={(value) => setTab(value as HomeworkType)}
            className="flex flex-col space-y-18"
        >
            {!disabled && (
                <RXTabs.List className="flex items-center space-x-14">
                    {[
                        {
                            id: HomeworkType.TEXT,
                            label: "Вопрос/Ответ",
                        },
                        {
                            id: HomeworkType.TEST,
                            label: "Тест",
                        },
                    ].map((trigger) => (
                        <RXTabs.Trigger
                            key={trigger.id}
                            value={trigger.id}
                            className="data-[state=active]:border-primary border-[#eee] transition-colors duration-300"
                        >
                            <span className="border-inherit border-2 rounded-8 py-8 px-16 flex items-center space-x-8">
                                <Icon.Add className="w-20 h-auto fill-primary" />

                                <span>{trigger.label}</span>
                            </span>
                        </RXTabs.Trigger>
                    ))}
                </RXTabs.List>
            )}

            <RXTabs.Content value={HomeworkType.TEXT}>
                <Textarea
                    placeholder="Введите текст вопроса"
                    value={text}
                    disabled={disabled}
                    onChange={(event) => {
                        setText(event.currentTarget.value);
                    }}
                />
            </RXTabs.Content>

            <RXTabs.Content value={HomeworkType.TEST} className="flex flex-col">
                <div className="flex flex-col space-y-24 mb-18">
                    {test.map((question, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col space-y-24 p-24 shadow-even-sm bg-[#fff] rounded-lg"
                        >
                            <div className="flex flex-col space-y-8">
                                <div className="flex items-center justify-between">
                                    <Label>Вопрос {idx + 1}</Label>

                                    {!disabled && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setTest(
                                                    test.filter(
                                                        (_, index) =>
                                                            idx !== index,
                                                    ),
                                                );
                                            }}
                                        >
                                            <Icon.Cross className="w-10 h-auto fill-[#434343]" />
                                        </button>
                                    )}
                                </div>

                                <Input
                                    disabled={disabled}
                                    placeholder="Введите вопрос"
                                    value={question.text}
                                    onChange={(event) => {
                                        setTest(
                                            test.map((q, index) =>
                                                index === idx
                                                    ? {
                                                          ...q,
                                                          text: event
                                                              .currentTarget
                                                              .value,
                                                      }
                                                    : q,
                                            ),
                                        );
                                    }}
                                />
                            </div>

                            <RadioGroup
                                disabled={disabled}
                                onValueChange={(value) => {
                                    setTest(
                                        test.map((q, index) =>
                                            index === idx
                                                ? {
                                                      ...q,
                                                      correctAnswerIndex:
                                                          +value,
                                                  }
                                                : q,
                                        ),
                                    );
                                }}
                                className="flex flex-col space-y-10"
                            >
                                {question.answers.map((answer, aidx) => (
                                    <div
                                        key={aidx}
                                        className="flex items-center space-x-24"
                                    >
                                        <RadioGroupItem
                                            value={String(aidx)}
                                            checked={
                                                aidx ===
                                                question.correctAnswerIndex
                                            }
                                            className="min-w-28 min-h-28"
                                        />

                                        <Input
                                            disabled={disabled}
                                            placeholder="Введите ответ"
                                            value={answer}
                                            onChange={(event) => {
                                                setTest(
                                                    test.map((q, index) =>
                                                        index === idx
                                                            ? {
                                                                  ...q,
                                                                  answers:
                                                                      q.answers.map(
                                                                          (
                                                                              a,
                                                                              aindex,
                                                                          ) =>
                                                                              aindex ===
                                                                              aidx
                                                                                  ? event
                                                                                        .currentTarget
                                                                                        .value
                                                                                  : a,
                                                                      ),
                                                              }
                                                            : q,
                                                    ),
                                                );
                                            }}
                                        />

                                        {!disabled && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setTest(
                                                        test.map((q, index) =>
                                                            index === idx
                                                                ? {
                                                                      ...q,
                                                                      answers:
                                                                          q.answers.filter(
                                                                              (
                                                                                  _,
                                                                                  aindex,
                                                                              ) =>
                                                                                  aindex !==
                                                                                  aidx,
                                                                          ),
                                                                  }
                                                                : q,
                                                        ),
                                                    );
                                                }}
                                            >
                                                <Icon.Cross className="w-10 h-auto fill-[#434343]" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </RadioGroup>

                            {!disabled && (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setTest(
                                            test.map((q, index) =>
                                                index === idx
                                                    ? {
                                                          ...q,
                                                          answers: [
                                                              ...q.answers,
                                                              "",
                                                          ],
                                                      }
                                                    : q,
                                            ),
                                        );
                                    }}
                                    color="secondary"
                                    className="flex items-center space-x-12 justify-center w-fit"
                                >
                                    <Icon.Add className="w-20 h-auto fill-primary" />
                                    <span>Добавить ответ</span>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {!disabled && (
                    <Button
                        type="button"
                        onClick={() => {
                            setTest([
                                ...test,
                                {
                                    text: "",
                                    answers: ["", ""],
                                    correctAnswerIndex: 0,
                                },
                            ]);
                        }}
                        className="flex items-center space-x-12 justify-center w-fit"
                    >
                        <Icon.Add className="w-20 h-auto fill-[#fff]" />

                        <span>Добавить вопрос</span>
                    </Button>
                )}
            </RXTabs.Content>
        </RXTabs.Root>
    );
};
