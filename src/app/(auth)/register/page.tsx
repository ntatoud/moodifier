"use client";
import {
  zRegisterFormFields,
  type RegisterFormFields,
} from "@/features/auth/register/schemas";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/Form";
import { register } from "@/features/auth/register/actions";
import { toast } from "sonner";

export default function PageRegister() {
  const form = useForm<RegisterFormFields>({
    values: { username: "", password: "", passwordConfirm: "" },
    resolver: zodResolver(zRegisterFormFields()),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (values) => {
    const res = await register(values);

    if (res.error) {
      toast.error("Failed to register", {
        description: res.error,
      });
      return;
    }

    toast.success("User register successfully");
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

        <Button type="submit">Register</Button>
      </Form>
    </>
  );
}
