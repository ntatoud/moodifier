import { RegisterForm } from "@/features/auth/register/RegisterForm";
import Link from "next/link";

export default function PageRegister() {
  console.log("test");
  return (
    <>
      <h1 className="font-heading text-3xl leading-loose tracking-tight">
        Create an account
      </h1>
      <span className="inline text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary underline">
          Connect
        </Link>
      </span>
      <RegisterForm />
    </>
  );
}
