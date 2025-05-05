"use client";
import OnboardingForm from "@/components/OnboardingForm";
import { verifyVendor } from "@/lib/actions/auth.actions";

import { KycBusinessSchemaType } from "@/lib/schema";
import { toBase64 } from "@/lib/utils";
import { toast } from "sonner";

export default function Home() {
  const onSubmit = async (data: KycBusinessSchemaType) => {
    const newData = {
      ...data,
      ninFile: await toBase64(data.ninFile),
      logoFile: await toBase64(data.logoFile),
    };
    try {
      await verifyVendor(newData);
    } catch (error) {
      console.log('error', error)
      toast("an error occured");
    }
  };
  return (
    <div className="py-10 px-5 md:px-10 ">
      <div className="space-y-3 ">
        <h1 className="text-2xl text-center font-semibold tracking-widest">
          Online Markets in Africa <br />
          (O M A)
        </h1>
        <h3 className="text-lg text-center text-primary">
          Welcome to our Verification Portal
        </h3>
        <p className="text-center text-sm">
          To ensure trust and security in our online marketplace group, all
          members are required to complete a one-time identity and business
          verification. Please provide accurate and up-to-date information. This
          helps us maintain a safe environment for buyers and sellers. You will
          be given a look up verification Id to help customers using this
          platform verify your legibility
        </p>
        <p className="italic text-center font-light text-xs">
          All submitted data will be treated confidentially and used solely for
          verification purposes.
        </p>
      </div>

      <OnboardingForm
        defaultValues={{}}
        onSubmit={onSubmit}
      />
    </div>
  );
}
