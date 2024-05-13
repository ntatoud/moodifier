import { Input, type InputProps } from "../ui/input";
import type { FieldCommonProps } from "./FormField";
import { FormFieldError } from "./FormField/FormFieldError";
import { FormFieldHelper } from "./FormField/FormFieldHelper";
import { FormFieldItem } from "./FormField/FormFieldItem";
import { FormFieldLabel } from "./FormField/FormFieldLabel";
import type { ReactNode } from "react";
import { Controller, type FieldPath, type FieldValues } from "react-hook-form";

export type FieldTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: "text" | "email";
  label?: ReactNode;
  helper?: ReactNode;
  inputClassName?: string;
} & Pick<InputProps, "placeholder" | "size" | "autoFocus"> &
  FieldCommonProps<TFieldValues, TName>;

export const FieldText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  inputClassName,
  ...props
}: FieldTextProps<TFieldValues, TName>) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <FormFieldItem className={className}>
          {!!props.label && <FormFieldLabel>{props.label}</FormFieldLabel>}
          <Input
            type={props.type}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            disabled={props.isDisabled}
            className={inputClassName}
            required={props.optionalityHint === "required"}
            {...field}
          />
          {!!props.helper && <FormFieldHelper>{props.helper}</FormFieldHelper>}
          <FormFieldError />
        </FormFieldItem>
      )}
    />
  );
};
