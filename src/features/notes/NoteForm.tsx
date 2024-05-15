"use client";

import { Form, FormField } from "@/components/Form";
import { MOOD_OPTIONS, type NoteFormFields, zNoteFormFields } from "./schemas";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { FullLoader } from "@/components/FullLoader";
import { useNoteCRUD } from "./useNoteCRUD";

export const NoteForm = () => {
  const params = useParams();
  const date = params.date?.toString() ?? "";

  const { note, noteIsPending, create, update } = useNoteCRUD(date);

  const form = useForm<NoteFormFields>({
    mode: "onBlur",
    values: {
      mood: note?.mood ?? "happy",
      body: note?.body ?? "",
    },
    resolver: zodResolver(zNoteFormFields()),
  });

  const onSubmit: SubmitHandler<NoteFormFields> = (data) => {
    if (!!note) {
      update.mutate({
        ...data,
        date,
      });
      return;
    }

    create.mutate({
      ...data,
      date,
    });
  };

  console.log(note?.mood);
  if (noteIsPending) {
    return <FullLoader />;
  }

  return (
    <Form {...form} onSubmit={onSubmit}>
      <div className="flex w-96 flex-col gap-4">
        <FormField
          type="select"
          name="mood"
          control={form.control}
          label="How are you today ?"
          options={MOOD_OPTIONS}
        />
        <FormField
          type="textarea"
          name="body"
          control={form.control}
          label="Describe with more details"
          rows={8}
        />

        {!!note ? (
          <Button type="submit">Update</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </div>
    </Form>
  );
};
