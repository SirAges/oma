import React, { forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CertificateCard = forwardRef<HTMLDivElement, any | BusinessType>(
  (business, ref) => {
    console.log("business", business);
    return (
      <div className="flex items-center justify-center px-5 py-5">
        <div
          style={{
            border: "none",
            borderWidth: 0,
            outline: "none",
            boxShadow: "none",
          }}
          className="hidden flex-col items-center w-[1123px] whitespace-nowrap border-none outline-0 h-[794px] text-center bg-[url('../assets/images/pattern.webp')] bg-cover p-10 space-y-3"
          ref={ref}
        >
          <h1 className="text-4xl text-center font-medium uppercase text-amber-400 ">
            Online Markets in Africa
          </h1>
          <h3 className="text-7xl tracking-wider">Certificate</h3>
          <p className="text-4xl tracking-wider">of Verification</p>
          <p className="italic tracking-widest py-10">This is to prove that</p>
          <div className="border-y   rounded w-1/3 py-5 px-5 flex items-center justify-center">
            <p className="truncate text-5xl font-normal italic  tracking-widest">
              {business.businessName || "GC-TECH"}
            </p>
          </div>
          <p className="text-3xl font-semibold tracking-widest pt-10">
            OMA-ZEAH-344
          </p>
          <div className="flex items-center gap-x-4">
            <p>Nigeria</p>
            <p>Abuja</p>
          </div>
          <div className="text-xs tracking-wide space-y-2">
            <p>
              This business has submitted the neccessary KYC documents which
              have been reviewed.
            </p>
            <p>GC-TECH is fit for business</p>
            <p>
              use the verification code to validate this business on OMA website
            </p>
          </div>
          <div className="w-full flex items-center justify-between py-10 px-10">
            <div>
              <h2>CEO - OMA</h2>
              Ekele Hope Angela
            </div>
            <div>
              <h2>CEO - GC-TECH </h2>
              Ekele Stephen
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificateCard.displayName = "CertificateCard";

export default CertificateCard;
