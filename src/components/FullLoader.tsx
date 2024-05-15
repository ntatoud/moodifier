import { Loader2 } from "lucide-react";

export const FullLoader = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  );
};
