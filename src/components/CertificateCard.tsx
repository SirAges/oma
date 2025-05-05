import React, { forwardRef } from "react";

const CertificateCard = forwardRef<HTMLDivElement, object>((_, ref) => {
  return (
    <div ref={ref}>
      <p>Use the link below to verify:</p>
    </div>
  );
});


CertificateCard.displayName = "CertificateCard";

export default CertificateCard;
