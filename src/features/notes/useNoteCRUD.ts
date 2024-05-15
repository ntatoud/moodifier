import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// This hook is too avoid polluting the component with the logic of fetching and updating notes
export const useNoteCRUD = (date: string) => {
  const { data, isPending } = api.notes.getByDate.useQuery({ date });

  const router = useRouter();
  const createNote = api.notes.create.useMutation({
    onSuccess: () => {
      toast.success("Your note was created successfully");
      router.push("/");
    },
    onError: () => {
      toast.error("There was an error creating your note");
    },
  });

  const updateNote = api.notes.update.useMutation({
    onSuccess: () => {
      toast.success("Your note was updated successfully");
      router.push("/");
    },
    onError: () => {
      toast.error("There was an error updating your note");
    },
  });

  return {
    note: data?.noteData,
    noteIsPending: isPending,
    update: updateNote,
    create: createNote,
  };
};
