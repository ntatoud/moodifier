import { useFormFieldContext } from ".";
import { FormControl } from "./FormControl";
import { cn } from "@/lib/utils";
import {
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
} from "react";
import { useFormContext } from "react-hook-form";

type FormItemContextValue = {
  id: string;
};

export const FormFieldItemContext = createContext<FormItemContextValue | null>(
  null,
);

export const useFormFieldItemContext = () => {
  const ctx = useContext(FormFieldItemContext);
  if (!ctx) {
    throw new Error("Missing <FormFieldItem /> parent component");
  }
  return ctx;
};

export type FormFieldItemProps = {
  children?: ReactNode;
  id?: string;
  className?: string;
};

export const FormFieldItem = forwardRef<HTMLDivElement, FormFieldItemProps>(
  ({ className, ...props }, ref) => {
    const id = useId();
    const fieldContext = useFormFieldContext();
    const { getFieldState, formState } = useFormContext();
    const fieldState = getFieldState(fieldContext.name, formState);
    const contextValue = useMemo(() => ({ id }), [id]);

    return (
      <FormFieldItemContext.Provider value={contextValue}>
        <FormControl
          ref={ref}
          isInvalid={!!fieldState.error}
          isRequired={fieldContext.optionalityHint === "required"}
          isDisabled={fieldContext.isDisabled}
          {...props}
        >
          <div className={cn("flex flex-col", className)}>{props.children}</div>
        </FormControl>
      </FormFieldItemContext.Provider>
    );
  },
);
FormFieldItem.displayName = "FormItem";
