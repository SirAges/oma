import { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { COMPANY_NAME } from "@/lib/constants";
import Logo from "@/assets/images/img1.jpg";
import authImage from "@/assets/images/img2.jpg";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="md:px-10 flex justify-center items-center max-h-screen min-h-screen">
      <section className="px-5 flex flex-col items-center md:pr-10 h-full">
        <div className="space-y-2">
          <div className="flex gap-3 relative items-center">
            <Image
              src={Logo}
              alt="logo"
              className="object-cover object-center rounded-full w-10 h-10"
            />
            <h1 className="text-2xl font-semibold ">{COMPANY_NAME}</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className="hidden md:flex flex-1 h-[calc(100vh-4rem)] relative ">
        <Image
          src={authImage}
          alt="auth illustration"
          fill
          className="size-full object-cover rounded-lg"
        />
      </section>
    </main>
  );
};

export default Layout;
