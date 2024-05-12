import { Button } from "../ui/button";
import { Input, type InputProps } from "../ui/input";
import { type FieldCommonProps, useFormFieldContext } from "./FormField";
import { FormFieldError } from "./FormField/FormFieldError";
import { FormFieldHelper } from "./FormField/FormFieldHelper";
import { FormFieldItem } from "./FormField/FormFieldItem";
import { FormFieldLabel } from "./FormField/FormFieldLabel";
import { Eye, EyeOff } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Controller, type FieldPath, type FieldValues } from "react-hook-form";

export type FieldPasswordProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: "password";
  label?: ReactNode;
  helper?: ReactNode;
} & Pick<InputProps, "placeholder" | "size" | "autoFocus"> &
  FieldCommonProps<TFieldValues, TName>;

export const FieldPassword = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldPasswordProps<TFieldValues, TName>,
) => {
  const { isDisabled } = useFormFieldContext();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <FormFieldItem>
          {!!props.label && <FormFieldLabel>{props.label}</FormFieldLabel>}
          <div className="!m-0 flex items-center gap-1">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={props.placeholder}
              autoFocus={props.autoFocus}
              aria-disabled={isDisabled}
              {...field}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPassword((x) => !x)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          {!!props.helper && <FormFieldHelper>{props.helper}</FormFieldHelper>}
          <FormFieldError />
        </FormFieldItem>
      )}
    />
  );
};
