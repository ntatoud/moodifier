"use client";
import {
  zRegisterFormFields,
  type RegisterFormFields,
} from "@/features/auth/register/schemas";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/Form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

export default function PageRegister() {
  const router = useRouter();
  const register = api.auth.register.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Account created successfully");
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });

  const form = useForm<RegisterFormFields>({
    values: { username: "", password: "", passwordConfirm: "" },
    resolver: zodResolver(zRegisterFormFields()),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (values) => {
    register.mutate(values);
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
        <FormField
          name="passwordConfirm"
          type="password"
          label="Confirm Password"
          control={form.control}
        />

        <Button
          type="submit"
          isLoading={register.isPending}
          disabled={register.isPending}
        >
          Register
        </Button>
      </Form>
    </>
  );
}
