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
import { login } from "@/features/auth/login/actions";

export default function PageRegister() {
  const form = useForm<LoginFormFields>({
    values: { username: "", password: "" },
    resolver: zodResolver(zLoginFormFields()),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (values) => {
    const res = await login(values);

    if (res.error) {
      toast.error("Failed to log in the user", {
        description: res.error,
      });
      return;
    }

    toast.success("Logged in successfully");
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

        <Button type="submit">Connect</Button>
      </Form>
    </>
  );
}
