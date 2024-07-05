import {
	useState,
	useRef,
	useCallback,
	type KeyboardEvent,
	useEffect,
} from "react";
import {Command as CommandPrimitive} from "cmdk";
import {cx} from "class-variance-authority";

import {
	CommandGroup,
	CommandItem,
	CommandList,
	CommandInput,
	Icon,
	Spinner,
} from "@shared/ui";

export interface Option {
	label: string;
	value: string;
}

interface AutoCompleteProps {
	options: Option[];
	value?: Option;
	onValueChange?: (value: Option) => void;
	isLoading?: boolean;
	disabled?: boolean;
	placeholder?: string;
	onInputChange?: (search: string) => void;
	input?: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
	options,
	placeholder,
	value,
	onValueChange,
	disabled,
	isLoading = false,
	onInputChange,
	input,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isOpen, setOpen] = useState(false);
	const [selected, setSelected] = useState<Option>(value as Option);
	const [inputValue, setInputValue] = useState<string>(
		value?.label || input || "",
	);

	useEffect(() => {
		onInputChange?.(inputValue);
	}, [inputValue]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;

			if (!input) return;

			if (!isOpen) setOpen(true);

			if (event.key === "Enter" && input.value !== "") {
				const optionToSelect = options.find(
					(option) => option.label === input.value,
				);

				if (optionToSelect) {
					setSelected(optionToSelect);
					onValueChange?.(optionToSelect);
				}
			}

			if (event.key === "Escape") {
				input.blur();
			}
		},
		[isOpen, options, onValueChange],
	);

	const handleBlur = useCallback(() => {
		setOpen(false);
		setInputValue(selected?.label);
	}, [selected]);

	const handleSelectOption = useCallback(
		(selectedOption: Option) => {
			setInputValue(selectedOption.label);

			setSelected(selectedOption);
			onValueChange?.(selectedOption);

			setTimeout(() => {
				inputRef?.current?.blur();
			}, 0);
		},
		[onValueChange],
	);

	return (
		<CommandPrimitive onKeyDown={handleKeyDown}>
			<div>
				<CommandInput
					ref={inputRef}
					value={inputValue}
					onValueChange={isLoading ? undefined : setInputValue}
					onBlur={handleBlur}
					onFocus={() => setOpen(true)}
					placeholder={placeholder}
					disabled={disabled}
					className="!text-lg"
				/>
			</div>

			<div className="relative mt-4">
				<div
					className={cx(
						"animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 !rounded-sm bg-[#fff] outline-none w-[30rem]",
						isOpen ? "block" : "hidden",
					)}
				>
					<CommandList className="!rounded-sm ring-1 ring-slate-200">
						{isLoading ? (
							<CommandPrimitive.Loading className="p-18">
								<Spinner className="!border-[#434343] !w-24 !border-4 mx-auto" />
							</CommandPrimitive.Loading>
						) : null}

						{options.length > 0 && !isLoading ? (
							<CommandGroup>
								{options.map((option) => {
									const isSelected =
										selected?.value === option.value;
									return (
										<CommandItem
											key={option.value}
											value={option.label}
											onMouseDown={(event) => {
												event.preventDefault();
												event.stopPropagation();
											}}
											onSelect={() =>
												handleSelectOption(option)
											}
											className="flex w-full items-center gap-8 !text-md"
										>
											<Icon.Check
												className={cx(
													"w-10 fill-[#434343]",
													{
														"opacity-0":
															!isSelected,
													},
												)}
											/>

											{option.label}
										</CommandItem>
									);
								})}
							</CommandGroup>
						) : null}

						{!isLoading ? (
							<CommandPrimitive.Empty className="select-none !rounded-sm px-18 py-12 text-center text-md w-fit">
								Ничего не найдено
							</CommandPrimitive.Empty>
						) : null}
					</CommandList>
				</div>
			</div>
		</CommandPrimitive>
	);
};

export const Combobox = () => null;
