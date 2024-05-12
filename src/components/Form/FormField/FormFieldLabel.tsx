import { useFormField } from ".";
import type { ReactNode } from "react";

export type FormFieldLabelProps = {
  children: ReactNode;
};

export const FormFieldLabel = ({ ...props }: FormFieldLabelProps) => {
  const { optionalityHint } = useFormField();

  return (
    <span className="!m-0 flex items-baseline gap-1 font-semibold">
      {props.children}
      {optionalityHint === "required" && <p className="text-red-500">*</p>}
      {optionalityHint === "optional" && (
        <p className="text-sx text-muted-foreground">(optional)</p>
      )}
    </span>
  );
};
