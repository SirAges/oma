"use server";
import { asc, count, desc, eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";

export const getAllUsers = async ({
  page = 1,
  limit = 10,
  order = "desc",
}: {
  page: number;
  order: "asc" | "desc";
  sort?: keyof typeof users;
  limit?: number;
}) => {
  const orderDirection =
    order === "desc" ? desc(users.createdAt) : asc(users.createdAt);

  const offSet = (page - 1) * limit;

  const allUsers = await db
    .select()
    .from(users)
    .limit(limit)
    .offset(offSet)
    .orderBy(orderDirection);
  const result = await db.select({ count: count() }).from(users);
  const totalUsers = result[0].count;
  const hasNextPage = offSet + page < result[0].count;
  return {
    data: allUsers,
    nextPage: hasNextPage ? page + 1 : null,
    totalUsers,
  };
};

export const getUser = async ({ userId }: { userId: string }) => {
  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    return {
      success: true,
      data: user,
      message: "user fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};

export const changeRole = async ({
  userId,
  role,
}: {
  userId: string;
  role: "USER" | "ADMIN";
}) => {
  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");
    const userUsers = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, userId));
    return {
      data: userUsers,
      success: true,
      message: "users fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};

export const updateUser = async ({
  userId,
  data,
}: {
  userId: string;
  data: UserFormType;
}) => {
  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");

    await db.update(users).set(data).where(eq(users.id, userId));
    return {
      success: true,
      message: "users fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");
    await db.delete(users).where(eq(users.id, userId));
    return {
      success: true,
      message: "users fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};
