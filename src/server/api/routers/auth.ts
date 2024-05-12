import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";
import { zLoginFormFields } from "@/features/auth/login/schemas";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { zRegisterFormFields } from "@/features/auth/register/schemas";
import { generateId } from "lucia";
import { users } from "@/server/db/schema";

export const authRouter = createTRPCRouter({
  register: publicProcedure()
    .input(zRegisterFormFields())
    .output(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { lucia, db } = ctx;
      const hashedPassword = await hash(input.password, 12);
      const userId = generateId(15);

      const existingUser = await db.query.users.findFirst({
        where: (table) => eq(table.username, input.username),
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      try {
        await db
          .insert(users)
          .values({
            id: userId,
            username: input.username,
            hashedPassword,
          })
          .returning({
            id: users.id,
            username: users.username,
          });
      } catch (err: unknown) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to register",
        });
      }

      const session = await lucia.createSession(userId, {
        expiresIn: 60 * 60 * 24 * 30,
      });

      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return {
        userId,
      };
    }),
  login: publicProcedure()
    .input(zLoginFormFields())
    .output(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { lucia, db } = ctx;
      const existingUser = await db.query.users.findFirst({
        where: (table) => eq(table.username, input.username),
      });

      if (!existingUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      const isValidPassword = await compare(
        input.password,
        existingUser.hashedPassword,
      );

      if (!isValidPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid credentials",
        });
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
        userId: existingUser.id,
      };
    }),
  logout: protectedProcedure()
    .input(z.void())
    .output(z.void())
    .mutation(async ({ ctx }) => {
      const { lucia, session } = ctx;

      if (!session) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Not logged in",
        });
      }

      await lucia.invalidateSession(session.id);

      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }),
});
