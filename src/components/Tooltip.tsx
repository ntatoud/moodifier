import type { ReactNode } from "react";
import {
  TooltipProvider,
  Tooltip as BaseTooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

export type TooltipProps = {
  title: string;
  children: ReactNode;
  delay?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
};
export function Tooltip({ title, children, ...props }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={props.delay}>
      <BaseTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align={props.align} alignOffset={props.alignOffset}>
          {title}
        </TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  );
}
