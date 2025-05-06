import { z } from "zod";
export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const reviewSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  position: z.string().min(1, "Position is required"),
  review: z.string().min(1, "Review is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  date: z.string().min(1, "Date is required"),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
export const kycSchema = z.object({
  // KYC Fields
  nin: z.string().min(1, "NIN is required"),
  ninFile: z.instanceof(File, { message: "nin file file is required" }),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
});
export const businessSchema = z.object({
  // Business Fields
  businessName: z.string().min(1),
  businessTel: z.string().min(1),
  businessEmail: z.string().email(),
  logoFile: z
    .instanceof(File, { message: "ID Card file is required" })
    .optional(),
  businessDescription: z.string().min(1),
  registerationNumber: z.string().min(1),
  businessAddress: z.string().min(1),
  businessCity: z.string().min(1),
  businessState: z.string().min(1),
  businessCountry: z.string().min(1),
  landmark: z.string().min(1),
});
export const kycBusinessSchema = kycSchema.merge(businessSchema);
export type KycSchemaType = z.infer<typeof kycSchema>;
export type BusinessSchemaType = z.infer<typeof businessSchema>;
export type KycBusinessSchemaType = KycSchemaType & BusinessSchemaType;
