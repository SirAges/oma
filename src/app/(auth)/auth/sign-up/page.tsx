"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth.actions";
import { signUpSchema } from "@/lib/schema";

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
     
    }}
    onSubmit={signUp}
  />
);

export default Page;
