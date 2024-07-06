import {forwardRef, useCallback} from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import {cx} from "class-variance-authority";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Hidden,
	Icon,
	Input,
	InputProps,
	Popover,
	PopoverContent,
	PopoverTrigger,
	ScrollArea,
} from "@shared/ui";

import rulocale from "./locales/ru.json";

type PhoneInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"onChange" | "value"
> &
	Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
		onChange?: (value: RPNInput.Value) => void;
	};

export const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
	forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
		({className, onChange, ...props}, ref) => {
			return (
				<RPNInput.default
					ref={ref}
					className={cx("flex", className)}
					flagComponent={() => <Hidden />}
					countrySelectComponent={() => null}
					inputComponent={InputComponent}
					labels={rulocale}
					// @ts-ignore
					onChange={(value) => onChange?.(value || "")}
					{...props}
				/>
			);
		},
	);

PhoneInput.displayName = "PhoneInput";

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
	({className, ...props}, ref) => (
		<Input className={cx("rounded-e-lg", className)} {...props} ref={ref} />
	),
);

InputComponent.displayName = "InputComponent";

interface CountrySelectOption {
	label: string;
	value: RPNInput.Country;
}

interface CountrySelectProps {
	disabled?: boolean;
	value: RPNInput.Country;
	onChange: (value: RPNInput.Country) => void;
	options: CountrySelectOption[];
}

const CountrySelect = ({
	disabled,
	value,
	onChange,
	options,
}: CountrySelectProps) => {
	const handleSelect = useCallback(
		(country: RPNInput.Country) => {
			onChange(country);
		},
		[onChange],
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					type="button"
					className={cx(
						"flex gap-4 rounded-e-0 rounded-s-lg border border-r-0 px-20 items-center justify-center bg-[#fff]",
					)}
					disabled={disabled}
				>
					<FlagComponent country={value} countryName={value} />

					<Icon.Caret.UpDown
						className={cx(
							"-mr-8 h-16 w-16 opacity-50 fill-[#434343]",
							disabled ? "hidden" : "opacity-100",
						)}
					/>
				</button>
			</PopoverTrigger>

			<PopoverContent className="w-30 !p-0">
				<Command>
					<CommandList>
						<ScrollArea>
							<CommandInput
								placeholder="Найдите страну"
								className="xs:text-lg"
							/>

							<CommandEmpty>Страны не найдено.</CommandEmpty>

							<CommandGroup>
								{options
									.filter((x) => x.value)
									.map((option) => (
										<CommandItem
											className="gap-8"
											key={option.value}
											onSelect={() =>
												handleSelect(option.value)
											}
										>
											<FlagComponent
												country={option.value}
												countryName={option.label}
											/>

											<span className="flex-1 text-sm xs:text-xl">
												{option.label}
											</span>

											{option.value && (
												<span className="text-foreground/50 text-sm">
													{`+${RPNInput.getCountryCallingCode(option.value)}`}
												</span>
											)}

											<Icon.Check
												className={cx(
													"ml-auto h-16 w-16",
													option.value === value
														? "opacity-100"
														: "opacity-0",
												)}
											/>
										</CommandItem>
									))}
							</CommandGroup>
						</ScrollArea>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

const FlagComponent = ({country, countryName}: RPNInput.FlagProps) => {
	const Flag = flags[country];

	return (
		<span className="bg-foreground/20 flex h-16 w-24 overflow-hidden rounded-sm">
			{Flag && <Flag title={countryName} />}
		</span>
	);
};

FlagComponent.displayName = "FlagComponent";
