"use server";

import { hash } from "bcryptjs";
import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "../prisma";
import { processUploads } from "../cloudinary";
import { sendEmail } from "../mailer";
import { applyHtmlString, signupHtmlString } from "../htmlStrings";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { email, password } = params;

  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await signInWithCredentials({ email, password });
    sendEmail({
      email,
      subject: "Welcome to OMA",
      message: signupHtmlString(),
    });
    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};

export const handleSignOut = async () => {
  await signOut();
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyVendor = async (data: any) => {
  const session = await auth();
  prisma.$transaction(
    async (tx) => {
      const processedLogo = await processUploads(data.logoFile);
      const processedNin = await processUploads(data.ninFile);
      const {
        nin,
        ninFile,
        address,
        firstName,
        lastName,
        city,
        state,
        country,
        businessName,
        businessTel,
        businessEmail,
        logoFile,
        registerationNumber,
        businessDescription,
        businessAddress,
        businessCity,
        businessState,
        businessCountry,
        landmark,
      } = { ...data, logoFile: processedLogo, ninFile: processedNin };
      const kycData = {
        userId: session?.user?.id as string,
        nin,
        ninFile,
        address,
        firstName,
        lastName,
        city,
        state,
        country,
      };
      const businessData = {
        userId: session?.user?.id as string,
        businessName,
        businessTel,
        businessEmail,
        logoFile,
        registerationNumber,
        businessDescription,
        businessAddress,
        businessCity,
        businessState,
        businessCountry,
        landmark,
      };
      const kyc = await tx.kyc.create({ data: kycData });
      const business = await tx.business.create({ data: businessData });
      if (kyc && business) {
        sendEmail({
          email: session?.user?.email as string,
          message: applyHtmlString(kyc?.lastName as string),
          subject: "Vendor Verification",
        });
      }
    },
    { maxWait: 5000, timeout: 60000 }
  );
};
