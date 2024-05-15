import { TopBar } from "@/features/layout/TopBar";
import { NoteForm } from "@/features/notes/NoteForm";

export default function PageNotes() {
  return (
    <div className="flex w-full flex-1 flex-col px-4 md:px-20">
      <TopBar backTo="/" />
      <div className="flex flex-1 flex-col items-center justify-start py-10">
        <NoteForm />
      </div>
    </div>
  );
}
