import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { processUploads } from "./cloudinary";
//@ts-expect-error type not in registry
import domtoimage from "dom-to-image-more";

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

export class GenerateCertifate {
  private certificateRef;
  constructor(certificateRef: HTMLDivElement) {
    this.certificateRef = certificateRef;
  }

  async genDomToImage() {
    try {
      this.certificateRef.style.display = "flex";
      const certificateBase64 = await domtoimage.toPng(this.certificateRef);
      if (certificateBase64) {
        const certificateFile = (await processUploads(
          certificateBase64
        )) as FileType;
        console.log("certificateFile", certificateFile);
        this.certificateRef.style.display = "none";
        return certificateFile;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
