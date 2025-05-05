"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, FieldValues, useForm } from "react-hook-form";

import { Loader2 } from "lucide-react";
import { kycBusinessSchema, KycBusinessSchemaType } from "@/lib/schema";
import FilePicker from "./FilePicker";
import { Textarea } from "./ui/textarea";
import ScreenLoader from "./ScreenLoader";
const Placeholder = {
  // KYC
  nin: "12345678901",
  ninFile: "https://example.com/logo.png",
  firstName: "loveth",
  lastName: "Smart",
  address: "123 Main Street",
  city: "Lagos",
  state: "Lagos State",
  country: "Nigeria",
  // Business
  businessName: "Jafer Booking Ltd",
  businessTel: "+2348012345678",
  businessEmail: "business@example.com",
  logoFile: "https://example.com/logo.png",
  registerationNumber: "RC123456",
  businessDescription: "In GARO we sell...",
  businessAddress: "456 Corporate Road",
  businessCity: "Abuja",
  businessState: "FCT",
  businessCountry: "Nigeria",
  landmark: "Opposite Central Mall",
};
const InputType = {
  // KYC
  nin: "text",
  ninFile: "file",
  firstName: "text",
  lastName: "text",
  address: "text",
  city: "text",
  state: "text",
  country: "text",
  // Business
  businessName: "text",
  businessTel: "tel",
  businessEmail: "email",
  logoFile: "file",
  registerationNumber: "text",
  businessDescription: "text",
  businessAddress: "text",
  businessCity: "text",
  businessState: "text",
  businessCountry: "text",
  landmark: "text",
};
const LabelText = {
  // KYC
  nin: "NIN",
  ninFile: "nin clear picture",
  address: "Address",
  firstName: "First Name",
  lastName: "Last Name",
  city: "City",
  state: "State",
  country: "Country",
  // Business
  businessName: "Business Name",
  businessTel: "Business Telephone",
  businessEmail: "Business Email",
  logoFile: "Logo",
  registerationNumber: "Registration Number",
  businessDescription: "Business Description",
  businessAddress: "Business Address",
  businessCity: "Business City",
  businessState: "Business State",
  businessCountry: "Business Country",
  landmark: "Landmark",
};

const OnboardingForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (value: KycBusinessSchemaType) => Promise<void>;
  defaultValues: object | FieldValue<FieldValues> | undefined;
}) => {
  const method = useForm({
    resolver: zodResolver(kycBusinessSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, disabled, errors },
  } = method;
  console.log("errors", errors);
  return (
    <Form {...method}>
      <form
        className="flex flex-col items-center w-full gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ScreenLoader
          open={isSubmitting}
          message="sending verification for review"
        />
        <h1 className="text-2xl font-semibold w-full text-start">
          kyc details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-full h-full gap-4">
          <FormField
            control={control}
            name={"lastName"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["lastName"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["lastName"]}
                    className="placeholder:text-foreground/50"
                    placeholder={Placeholder["lastName"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={control}
            name={"firstName"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["firstName"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["firstName"]}
                    className="placeholder:text-foreground/50"
                    placeholder={Placeholder["firstName"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"nin"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["nin"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["nin"]}
                    className="placeholder:text-foreground/50"
                    placeholder={Placeholder["nin"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"country"}
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>{LabelText["country"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["country"]}
                    className="placeholder:text-foreground/50"
                    placeholder={Placeholder["country"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"state"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["state"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["state"]}
                    className="placeholder:text-foreground/50"
                    placeholder={Placeholder["state"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={control}
            name={"city"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["city"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["city"]}
                    className="placeholder:text-foreground/50"
                    placeholder={Placeholder["city"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"address"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["address"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["address"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["address"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <h1 className="text-2xl font-semibold w-full text-start capitalize">
          business details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full h-full gap-4">
          <FormField
            control={control}
            name={"businessName"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["businessName"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["businessName"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["businessName"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"businessTel"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["businessTel"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["businessTel"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["businessTel"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={control}
            name={"businessEmail"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["businessEmail"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["businessEmail"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["businessEmail"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={control}
            name={"registerationNumber"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["registerationNumber"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["registerationNumber"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["registerationNumber"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={control}
            name={"businessCountry"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["businessCountry"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["businessCountry"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["businessCountry"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"businessState"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["businessState"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["businessState"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["businessState"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={control}
            name={"businessCity"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["businessCity"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["businessCity"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["businessCity"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={control}
            name={"businessAddress"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["businessAddress"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["businessAddress"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["businessAddress"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={control}
            name={"landmark"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{LabelText["landmark"]}</FormLabel>
                <FormControl>
                  <Input
                    type={InputType["landmark"]}
                    className=" placeholder:text-foreground/50"
                    placeholder={Placeholder["landmark"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <div className="hidden sm:flex md:hidden"></div>
          <FormField
            control={control}
            name={"businessDescription"}
            render={({ field }) => (
              <FormItem className="w-full sm:col-span-2 md:col-span-1 h-44">
                <FormLabel>{LabelText["businessDescription"]}</FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={500}
                    className=" placeholder:text-foreground/50 flex-1"
                    placeholder={Placeholder["businessDescription"]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FilePicker
            key={"logoFile"}
            id={"logoFile"}
            label={LabelText["logoFile"]}
            type={InputType["logoFile"]}
            placeholder={Placeholder["logoFile"]}
            control={control}
          />
          <FilePicker
            key={"ninFile"}
            id={"ninFile"}
            label={LabelText["ninFile"]}
            type={InputType["ninFile"]}
            placeholder={Placeholder["ninFile"]}
            control={control}
          />
        </div>
        <Button
          disabled={disabled}
          type="submit"
          className="cursor-pointer w-full sm:w-56"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Message"}
        </Button>
      </form>
    </Form>
  );
};
export default OnboardingForm;
