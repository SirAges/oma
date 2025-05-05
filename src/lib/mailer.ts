"use server";
import config from "@/lib/config";
import nodemailer from "nodemailer";
import { COMPANY_NAME } from "./constants";
const transporter = nodemailer.createTransport({
  //@ts-expect-error host
  host: config.env.email.host,
  port: config.env.email.port,
  secure: true,
  auth: {
    user: config.env.email.user,
    pass: config.env.email.pass,
  },
});
export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await transporter.sendMail({
    from: `${COMPANY_NAME} <${process.env.SMTP_USER}>`,
    to: [email],
    subject,
    html: message,
  });
};
