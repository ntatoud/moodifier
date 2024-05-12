import { useFormField } from ".";
import { AlertCircle } from "lucide-react";

export const FormFieldError = () => {
  const { error } = useFormField();

  if (!error) {
    return null;
  }

  return (
    <span className="!m-0 flex items-center text-red-500 animate-in slide-in-from-top-5">
      <AlertCircle className="mr-1 h-4 w-4" />
      {!!error?.message && <p>{error.message}</p>}
    </span>
  );
};
