import type { ReactNode } from "react";

export const FormFieldHelper = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};
