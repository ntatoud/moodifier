import { useId, type ReactNode } from "react";

import {
  Controller,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";

import type { FieldCommonProps } from "@/components/Form/FormField";
import { FormFieldError } from "@/components/Form/FormField/FormFieldError";
import { FormFieldHelper } from "@/components/Form/FormField/FormFieldHelper";
import { FormFieldItem } from "@/components/Form/FormField/FormFieldItem";
import { FormFieldLabel } from "@/components/Form/FormField/FormFieldLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { SelectProps } from "@radix-ui/react-select";

export type FieldSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: "select";
  label?: ReactNode;
  helper?: ReactNode;
  placeholder?: string;
  autoFocus?: boolean;
  options: Readonly<
    Readonly<{
      label: string;
      value: PathValue<TFieldValues, TName>;
    }>[]
  >;
} & Omit<SelectProps, "ref"> &
  FieldCommonProps<TFieldValues, TName>;

export const FieldSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldSelectProps<TFieldValues, TName>,
) => {
  const id = useId();

  return (
    <Controller
      {...props}
      render={({ field }) => {
        const { value, onChange, ref, ...fieldProps } = field;
        const selectValue =
          props.options?.find((option) => option.value === value) ?? undefined;
        return (
          <FormFieldItem>
            {!!props.label && <FormFieldLabel>{props.label}</FormFieldLabel>}
            <Select
              defaultValue={selectValue?.value}
              onValueChange={(value: string) => onChange(value)}
              {...fieldProps}
            >
              <SelectTrigger
                className="w-[180px]"
                autoFocus={props.autoFocus}
                ref={ref}
                disabled={props.isDisabled}
              >
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {props.options.map(({ label, value }) => (
                  <SelectItem
                    key={`feedback-select-${id}-${label}`}
                    value={value}
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!!props.helper && (
              <FormFieldHelper>{props.helper}</FormFieldHelper>
            )}
            <FormFieldError />
          </FormFieldItem>
        );
      }}
    />
  );
};
