import type { StrictUnion } from "@/types/utilities";
import {
  type FieldValues,
  FormProvider,
  type FormProviderProps,
  type SubmitHandler,
} from "react-hook-form";

export type FormProps<TFieldValues extends FieldValues> = StrictUnion<
  | (FormProviderProps<TFieldValues> & {
      noHtmlForm?: false;
      onSubmit?: SubmitHandler<TFieldValues>;
    })
  | (FormProviderProps<TFieldValues> & {
      noHtmlForm: true;
    })
>;

export const Form = <TFieldValues extends FieldValues>({
  noHtmlForm = false,
  ...props
}: FormProps<TFieldValues>) => {
  if (noHtmlForm) {
    return <FormProvider {...props} />;
  }

  return (
    <FormProvider {...props}>
      <form
        noValidate
        onSubmit={
          props.onSubmit ? props.handleSubmit(props.onSubmit) : undefined
        }
      >
        {props.children}
      </form>
    </FormProvider>
  );
};

export { FormField } from "./FormField";
export { FormFieldItem } from "./FormField/FormFieldItem";
export { FormFieldLabel } from "./FormField/FormFieldLabel";
export { FormFieldHelper } from "./FormField/FormFieldHelper";
export { FormFieldError } from "./FormField/FormFieldError";
