"use server";

import { lucia, validateRequest } from "@/server/auth/lucia";
import { cookies } from "next/headers";

export const logout = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "UNAUTHORIZED",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error: unknown) {
    console.log(error);
    return {
      error: "Could not log out",
    };
  }
};
