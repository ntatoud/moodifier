"use client";
import {
  zLoginFormFields,
  type LoginFormFields,
} from "@/features/auth/login/schemas";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/Form";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function PageRegister() {
  const router = useRouter();
  const login = api.auth.login.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Logged in successfully");
    },
    onError: () => {
      toast.error("Failed to log in the user");
    },
  });
  const form = useForm<LoginFormFields>({
    values: { username: "", password: "" },
    resolver: zodResolver(zLoginFormFields()),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (values) => {
    login.mutate(values);
  };

  return (
    <>
      <Form {...form} onSubmit={onSubmit}>
        <FormField
          name="username"
          type="text"
          label="Username"
          control={form.control}
        />
        <FormField
          name="password"
          type="password"
          label="Password"
          control={form.control}
        />

        <Button
          type="submit"
          isLoading={login.isPending}
          disabled={login.isPending}
        >
          Connect
        </Button>
      </Form>
    </>
  );
}
