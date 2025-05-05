"use server";
import { v2 as cloudinary } from "cloudinary";
import config from "./config";

cloudinary.config({
  cloud_name: config.env.cloudinary.cloudName,
  api_key: config.env.cloudinary.apiKey,
  api_secret: config.env.cloudinary.apiSecret,
});

export const processUploads = async (base64String: string | undefined) => {
  if (!base64String) {
    throw new Error("error uploading file");
  }

  const fileMimeType = base64String.split(";")[0].split(":")[1];

  const resourceType = fileMimeType.startsWith("image/")
    ? "image"
    : fileMimeType.startsWith("video/")
    ? "video"
    : "raw";

  const options = {
    folder: "labook",
    resource_type: resourceType as "image" | "video" | "raw",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    invalidate: true,
    timeout: 60000,
  };

  const result = await cloudinary.uploader.upload(base64String, options);
  const fileResult = {
    secure_url: result.secure_url,
    format: result.format,
    bytes: result.bytes,
    public_id: result.public_id,
  };

  return fileResult;
};
