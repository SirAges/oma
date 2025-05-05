"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReviewSchemaType } from "../schema";

export const addReview = async ({ data }: { data: ReviewSchemaType }) => {
  try {
    await db.insert(reviews).values(data);
    return {
      success: true,
      message: "reviews fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};

export const getAllReviews = async ({
  page = 1,
  limit = 10,
  order = "desc",
}: {
  page?: number;
  order?: "asc" | "desc";
  sort?: keyof typeof reviews;
  limit?: number;
}) => {
  const orderDirection =
    order === "desc" ? desc(reviews.createdAt) : asc(reviews.createdAt);
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");
  const offSet = (page - 1) * limit;

  const allReviews = await db
    .select()
    .from(reviews)
    .limit(limit)
    .offset(offSet)
    .orderBy(orderDirection);
  const result = await db.select({ count: count() }).from(reviews);
  const totalReviews = result[0].count;
  const hasNextPage = offSet + page < result[0].count;
  return {
    data: allReviews,
    nextPage: hasNextPage ? page + 1 : null,
    totalReviews,
  };
};

export const getReview = async ({ reviewId }: { reviewId: string }) => {
  try {
    const review = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, reviewId))
      .limit(1);

    return {
      success: true,
      data: review,
      message: "review fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};

export const updateReview = async ({
  reviewId,
  data,
}: {
  reviewId: string;
  data: ReviewSchemaType;
}) => {
  try {
    await db.update(reviews).set(data).where(eq(reviews.id, reviewId));
    return {
      success: true,
      message: "reviews fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};

export const deleteReview = async ({ reviewId }: { reviewId: string }) => {
  try {
    await db.delete(reviews).where(eq(reviews.id, reviewId));
    return {
      success: true,
      message: "reviews fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};
