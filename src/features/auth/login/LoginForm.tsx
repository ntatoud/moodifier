"use client";
import { Form, FormField } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zLoginFormFields, type LoginFormFields } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
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
    <Form {...form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
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
      </div>
    </Form>
  );
};
