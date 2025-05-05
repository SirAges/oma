import { clsx, type ClassValue } from "clsx";
import html2canvas from "html2canvas";
import { twMerge } from "tailwind-merge";
import { processUploads } from "./cloudinary";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toBase64 = (file: File | undefined): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const generateVerificationId = (prefix: string) => {
  const digits = "0123456789";
  const randomDigit = Array(3)
    .fill("")
    .map(() => digits.charAt(Math.floor(Math.random() * digits.length)))
    .join("");
  const verificationId = `${prefix}-${randomDigit}`;
  return verificationId;
};

export const generateCertificate = async (certificateRef: HTMLDivElement) => {
  try {
    const canvas = await html2canvas(certificateRef);
    const certificateBase64 = canvas.toDataURL();
    if (certificateBase64) {
      const certificateFile = await processUploads(certificateBase64);
      return certificateFile;
    }
  } catch (error) {
    console.log("error", error);
  }
};
