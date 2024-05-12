import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type FormControlCustomProps = {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
};
export const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & FormControlCustomProps
>(({ ...props }, ref) => {
  return (
    <Slot
      ref={ref}
      id={props.id}
      aria-disabled={props.isDisabled}
      aria-required={props.isRequired}
      aria-invalid={props.isInvalid}
      {...props}
    >
      <>{props.children}</>
    </Slot>
  );
});
FormControl.displayName = "FormControl";
