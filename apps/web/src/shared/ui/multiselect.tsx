import * as React from "react";
import {cx} from "class-variance-authority";

import {
	Icon,
	Badge,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	CommandList,
} from "@shared/ui";

export interface OptionType {
	label: string;
	value: string;
}

interface MultiSelectProps {
	options: OptionType[];
	selected: string[];
	onChange: React.Dispatch<React.SetStateAction<string[]>>;
	className?: string;
	emptyText?: string;
	placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	selected,
	onChange,
	className,
	emptyText,
	placeholder,
	...props
}) => {
	const [open, setOpen] = React.useState(false);

	const handleUnselect = (item: string) => {
		onChange(selected.filter((i) => i !== item));
	};

	return (
		<Popover open={open} onOpenChange={setOpen} {...props}>
			<PopoverTrigger asChild>
				<button
					role="combobox"
					aria-expanded={open}
					className="w-full flex items-center justify-between text-[#151515] rounded-lg border bg-transparent px-20 py-12 text-md shadow-sm transition-colors"
					onClick={() => setOpen(!open)}
				>
					<div className="flex gap-8 flex-wrap items-center">
						{!selected.length && (
							<span className="text-[#151515]/50">
								{placeholder}
							</span>
						)}

						{selected.map((item) => (
							<Badge variant="secondary" key={item}>
								{options.find((o) => o.value === item)?.label}

								<span
									role="button"
									className="ml-4 ring-offset-[#fff] rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUnselect(item);
										}
									}}
									onMouseDown={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={() => handleUnselect(item)}
								>
									<Icon.Cross className="h-8 w-8 fill-[#434343] hover:text-[#151515]" />
								</span>
							</Badge>
						))}
					</div>

					<Icon.Chevron.Up className="h-16 w-16 shrink-0 opacity-50" />
				</button>
			</PopoverTrigger>

			<PopoverContent
				className="w-full !p-0"
				align="start"
				alignOffset={8}
			>
				<Command className={className}>
					<CommandInput placeholder="Поиск" />

					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>

						<CommandGroup className="max-h-[18rem] overflow-auto">
							{options.map((option) => (
								<CommandItem
									key={option.value}
									onSelect={() => {
										onChange(
											selected.includes(option.value)
												? selected.filter(
														(item) =>
															item !==
															option.value,
													)
												: [...selected, option.value],
										);
										setOpen(true);
									}}
								>
									<Icon.Check
										className={cx(
											"mr-8 h-10 w-10 fill-[#434343]",
											selected.includes(option.value)
												? "opacity-100"
												: "opacity-0",
										)}
									/>

									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
