import {createContext, forwardRef, useContext, useId} from "react";
import {Slot} from "@radix-ui/react-slot";
import * as RXLabel from "@radix-ui/react-label";
import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form";
import {cx} from "class-variance-authority";

import {Label} from "@shared/ui";

export const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

export const FormFieldContext = createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

export const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{name: props.name}}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

export const useFormField = () => {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);
	const {getFieldState, formState} = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const {id} = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

export const FormItem = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => {
	const id = useId();

	return (
		<FormItemContext.Provider value={{id}}>
			<div ref={ref} className={cx("space-y-8", className)} {...props} />
		</FormItemContext.Provider>
	);
});

FormItem.displayName = "FormItem";

export const FormLabel = forwardRef<
	React.ElementRef<typeof RXLabel.Root>,
	React.ComponentPropsWithoutRef<typeof RXLabel.Root>
>(({className, ...props}, ref) => {
	const {error, formItemId} = useFormField();

	return (
		<Label
			ref={ref}
			className={cx(error && "text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
});

FormLabel.displayName = "FormLabel";

export const FormControl = forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(({...props}, ref) => {
	const {error, formItemId, formDescriptionId, formMessageId} =
		useFormField();

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
});

FormControl.displayName = "FormControl";

export const FormDescription = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => {
	const {formDescriptionId} = useFormField();

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cx("text-sm text-[#434343]", className)}
			{...props}
		/>
	);
});

FormDescription.displayName = "FormDescription";

export const FormMessage = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({className, children, ...props}, ref) => {
	const {error, formMessageId} = useFormField();

	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cx("text-sm font-medium text-destructive", className)}
			{...props}
		>
			{body}
		</p>
	);
});

FormMessage.displayName = "FormMessage";
