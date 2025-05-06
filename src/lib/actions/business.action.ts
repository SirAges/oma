"use server";
import { BusinessSchemaType } from "@/lib/schema";
import prisma from "../prisma";
import { processUploads } from "../cloudinary";
import { generateVerificationId } from "../utils";
import { sendEmail } from "../mailer";
import qrcode from "qrcode";
import { verifiedHtmlString } from "../htmlStrings";

export const addBusiness = async ({ data }: { data: BusinessSchemaType }) => {
  try {
    console.log("data", data);
    return {
      success: true,
      message: "businesses fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};
export const getAllBusinesses = async ({
  page = 1,
  limit = 10,
  order = "desc",
}: {
  page?: number;
  order?: "asc" | "desc";
  sort?: string;
  limit?: number;
}) => {
  try {
    const offSet = (page - 1) * limit;
    const foundBusinesses = await prisma.business.findMany({
      orderBy: { businessName: order },
      skip: offSet,
      take: limit,
    });
    const totalBusinesses = await prisma.business.count();
    const hasNextPage = offSet + page < totalBusinesses;
    return {
      success: true,
      message: "Business fetched successfully",
      status: 200,
      data: foundBusinesses,
      totalBusinesses,
      nextPage: hasNextPage ? page + 1 : null,
    };
  } catch (error: unknown) {
    console.log("error", error);
    return {
      error: true,
      message: "an error occured",
      status: 500,
      data: [],
    };
  }
};
export const getBusiness = async ({
  userId,
}: {
  userId: string | undefined;
}) => {
  try {
    const foundBusiness = await prisma.business.findFirst({
      where: { userId },
    });

    return {
      success: true,
      message: "Business fetched successfully",
      status: 200,
      data: foundBusiness,
    };
  } catch (error: unknown) {
    console.log("error", error);
    return {
      error: true,
      message: "an error occured",
      status: 500,
      data: [],
    };
  }
};
export const updateBusiness = async ({
  businessId,
  data,
}: {
  businessId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) => {
  try {
    if (!data) {
      throw new Error("no data to update");
    }
    const updated = await prisma.business.update({
      data,
      where: {
        id: businessId,
      },
    });
    return {
      success: true,
      message: "businesses fetched successfully",
      data: updated,
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};

export const getVerifiedBusiness = async ({
  verificationId,
}: {
  verificationId: string;
}) => {
  console.log("verificationId", verificationId);
};

export const verifyBusiness = async ({
  businessId,
}: {
  businessId: string;
}) => {
  try {
    const foundBusiness = await prisma.business.findFirst({
      where: { id: businessId },
    });
    if (!foundBusiness) {
      return {
        error: true,
        message: "Business does not exist",
        status: 400,
      };
    }

    const verificationId = generateVerificationId("OMA-ZEAH") as string;
    const updated = await prisma.business.update({
      data: { verificationId },
      where: { id: businessId },
    });
    if (updated) {
      const qrCodeUrl = await qrcode.toDataURL("This vendor is Verified");
      const qrCodeFile = await processUploads(qrCodeUrl);

      await sendEmail({
        email: foundBusiness.businessEmail,
        message: verifiedHtmlString(
          updated.businessName,
          verificationId,
          qrCodeFile.secure_url
        ),
        subject: "Verification Approval",
      });
      return {
        success: true,
        message: "Business Verified",
        status: 200,
        data: updated,
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: true,
      message: "an error occured",
      status: 500,
    };
  }
};

export const deleteBusiness = async ({
  businessId,
}: {
  businessId: string;
}) => {
  try {
    await prisma.business.delete({ where: { id: businessId } });
    return {
      success: true,
      message: "businesses fetched successfully",
    };
  } catch (error) {
    console.log("error", error);
    //@ts-expect-error error.message
    return { error: true, message: error.message };
  }
};
