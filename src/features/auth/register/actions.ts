"use server";

import { hash } from "bcrypt";
import type { RegisterFormFields } from "./schemas";
import { generateId } from "lucia";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { lucia } from "@/server/auth/lucia";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const register = async (values: RegisterFormFields) => {
  const hashedPassword = await hash(values.password, 12);

  const userId = generateId(15);

  console.log(values);
  try {
    const existingUser = await db.query.users.findFirst({
      where: (table) => eq(table.username, values.username),
    });

    if (existingUser) {
      return {
        error: "User already exists",
      };
    }
    const user = await db
      .insert(users)
      .values({
        id: userId,
        username: values.username,
        hashedPassword,
      })
      .returning({
        id: users.id,
        username: users.username,
      });

    const session = await lucia.createSession(userId, {
      exiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    console.log(user);
    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      error: "Failed to register user. Please try again.",
    };
  }
};
