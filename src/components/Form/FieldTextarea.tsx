import type { ReactNode } from "react";

import { Controller, type FieldPath, type FieldValues } from "react-hook-form";

import type { FieldCommonProps } from "@/components/Form/FormField";
import { FormFieldError } from "@/components/Form/FormField/FormFieldError";
import { FormFieldHelper } from "@/components/Form/FormField/FormFieldHelper";
import { FormFieldItem } from "@/components/Form/FormField/FormFieldItem";
import { FormFieldLabel } from "@/components/Form/FormField/FormFieldLabel";
import { Textarea, type TextareaProps } from "../ui/textarea";
import { cn } from "@/lib/utils";

export type FieldTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: "textarea";
  label?: ReactNode;
  helper?: ReactNode;
} & Pick<TextareaProps, "placeholder" | "autoFocus" | "rows"> &
  FieldCommonProps<TFieldValues, TName>;

export const FieldTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldTextareaProps<TFieldValues, TName>,
) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <FormFieldItem className={cn("w-full", props.className)}>
          {!!props.label && <FormFieldLabel>{props.label}</FormFieldLabel>}
          <Textarea
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            rows={props.rows}
            {...field}
          />
          {!!props.helper && <FormFieldHelper>{props.helper}</FormFieldHelper>}
          <FormFieldError />
        </FormFieldItem>
      )}
    />
  );
};
