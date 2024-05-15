import { cn } from "@/lib/utils";
import { InputPassword, type InputProps } from "../ui/input";
import { type FieldCommonProps } from "./FormField";
import { FormFieldError } from "./FormField/FormFieldError";
import { FormFieldHelper } from "./FormField/FormFieldHelper";
import { FormFieldItem } from "./FormField/FormFieldItem";
import { FormFieldLabel } from "./FormField/FormFieldLabel";
import type { ReactNode } from "react";
import { Controller, type FieldPath, type FieldValues } from "react-hook-form";

export type FieldPasswordProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: "password";
  label?: ReactNode;
  helper?: ReactNode;
  inputClassName?: string;
} & Pick<InputProps, "placeholder" | "size" | "autoFocus"> &
  FieldCommonProps<TFieldValues, TName>;

export const FieldPassword = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  inputClassName,
  ...props
}: FieldPasswordProps<TFieldValues, TName>) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <FormFieldItem className={cn("w-full", className)}>
          {!!props.label && <FormFieldLabel>{props.label}</FormFieldLabel>}
          <InputPassword
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
