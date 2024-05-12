"use server";

import { db } from "@/server/db";
import type { LoginFormFields } from "./schemas";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import { lucia } from "@/server/auth/lucia";
import { cookies } from "next/headers";

export const login = async (values: LoginFormFields) => {
  const existingUser = await db.query.users.findFirst({
    where: (table) => eq(table.username, values.username),
  });

  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const isValidPassword = await compare(
    values.password,
    existingUser.hashedPassword,
  );

  if (!isValidPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return {
    success: true,
    data: {
      userId: existingUser.id,
    },
  };
};
