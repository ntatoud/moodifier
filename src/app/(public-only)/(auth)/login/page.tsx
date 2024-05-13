import { LoginForm } from "@/features/auth/login/LoginForm";
import Link from "next/link";

export default function PageLogin() {
  return (
    <>
      <h1 className="font-heading text-3xl leading-loose tracking-tight">
        Log in to your account
      </h1>
      <span className="inline text-muted-foreground">
        First time here?{" "}
        <Link href="/register" className="text-primary underline">
          Register
        </Link>
      </span>
      <LoginForm />
    </>
  );
}
