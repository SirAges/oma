"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { COMPANY_NAME } from "@/lib/constants";
import ScreenLoader from "./ScreenLoader";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}
const FIELD_NAMES = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  password: "Password",
};

const FIELD_TYPES = {
  firstName: "text",
  lastName: "text",
  email: "email",
  password: "Password",
};

const FIELD_PLACEHOLDER = {
  firstName: "jora",
  lastName: "Smith",
  email: "example@mail.com",
  password: "********",
};
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();

  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const {
    formState: { isSubmitting },
  } = form;
  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      const result = await onSubmit(data);
      if (result.success) {
        toast(
          isSignIn
            ? "You have successfully signed in."
            : "You have successfully signed up."
        );

        router.push("/");
      } else {
        toast(`Error ${isSignIn ? "signing in" : "signing up"}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <ScreenLoader
        open={isSubmitting}
        message={isSignIn ? "Signing you in" : "Signing you up"}
      />
      <h1 className="text-2xl font-medium ">
        {isSignIn ? `Welcome back to ${COMPANY_NAME}` : "Create your account"}
      </h1>
      <p className="">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder={
                        FIELD_PLACEHOLDER[
                          field.name as keyof typeof FIELD_PLACEHOLDER
                        ]
                      }
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="w-full"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? `New to ${COMPANY_NAME}? ` : "Already have an account? "}

        <Link
          href={isSignIn ? "/auth/sign-up" : "/auth/sign-in"}
          className="font-medium text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};
export default AuthForm;
