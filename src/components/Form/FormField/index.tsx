import { FieldPassword, type FieldPasswordProps } from "../FieldPassword";
import { FieldText, type FieldTextProps } from "../FieldText";
import { useFormFieldItemContext } from "./FormFieldItem";
import { createContext, useContext, useMemo } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";

type FieldCustomProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: "custom";
  optionalityHint?: "required" | "optional" | false;
  isDisabled?: boolean;
  className?: string;
} & Omit<ControllerProps<TFieldValues, TName>, "disabled">;

export type FieldCommonProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FieldCustomProps<TFieldValues, TName>, "render" | "type">;

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props:
    | FieldCustomProps<TFieldValues, TName>
    | FieldTextProps<TFieldValues, TName>
    | FieldPasswordProps<TFieldValues, TName>,
) => {
  const getField = () => {
    switch (props.type) {
      case "custom":
        return <Controller {...props} />;

      case "text":
      case "email":
        return <FieldText {...props} />;

      case "password":
        return <FieldPassword {...props} />;
    }
  };

  const contextValue = useMemo(
    () => ({
      name: props.name,
      optionalityHint: props.optionalityHint,
      isDisabled: props.isDisabled,
    }),
    [props.name, props.optionalityHint, props.isDisabled],
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      {getField()}
    </FormFieldContext.Provider>
  );
};

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  optionalityHint?: "required" | "optional" | false;
  isDisabled?: boolean;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null,
);

export const useFormFieldContext = () => {
  const ctx = useContext(FormFieldContext);
  if (!ctx) {
    throw new Error("Missing <FormField /> parent component");
  }
  return ctx;
};

export const useFormField = () => {
  const fieldContext = useFormFieldContext();
  const itemContext = useFormFieldItemContext();
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    ...fieldContext,
    ...fieldState,
  };
};
