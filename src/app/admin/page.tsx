"use client";
import CertificateCard from "@/components/CertificateCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteBusiness,
  getAllBusinesses,
  updateBusiness,
  verifyBusiness,
} from "@/lib/actions/business.action";

import { cn, generateCertificate } from "@/lib/utils";
import { InputJsonValue } from "@prisma/client/runtime/library";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  CheckCircle,
  Delete,
  Eye,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
const Page = () => {
  const [businesses, setBusinesses] = useState<BusinessType[]>([]);

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null | undefined>(null);
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const [search, setSearch] = useState<string>("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, nextPage } = await getAllBusinesses({
        page,
        order,
      });
      setNextPage(nextPage);
      //TODO: check types
      //@ts-expect-error data file type match
      setBusinesses(data);
    };
    fetchData();
    return () => {};
  }, [page, order]);
  const handleVerify = async ({ businessId }: { businessId: string }) => {
    try {
      if (
        certificateRef?.current &&
        certificateRef.current instanceof HTMLElement
      ) {
        const verified = await verifyBusiness({
          businessId,
        });
        if (verified) {
          const certificateFile = await generateCertificate(
            certificateRef.current
          );
          const updated = await updateBusiness({
            businessId,
            data: { certificateFile: certificateFile as InputJsonValue },
          });
          console.log("html2canva", updated);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="">
        <CertificateCard ref={certificateRef} />
        <div className="bg-background flex items-center justify-between  sticky top-0 z-50 h-14 px-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
            <ArrowUpDown
              onClick={() =>
                setOrder((prev) => (prev === "desc" ? "asc" : "desc"))
              }
              className="cursor-pointer"
              size={14}
            />
          </div>
          <div className="flex-1 px-4">
            <Input
              name="search"
              placeholder="search businesses"
              value={search}
              onChange={handleSearch}
              className="max-w-72 py-3 px-2 bg-background"
            />
          </div>

          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
              <ArrowLeft
                onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                className="cursor-pointer"
                size={14}
              />
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-background/70">
              <ArrowRight
                onClick={() => setPage(nextPage!)}
                className="cursor-pointer"
                size={14}
              />
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll hide-scrollbar  max-h-[calc(100vh-3rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  "Logo File",
                  "Business Name",
                  "Registeration Number",
                  "Business Email",
                  "Business Description",
                  "Business Country",
                  "Business State",
                  "Business City",
                  "Business Address",
                  "Landmark",
                  "Certificate File",
                  "Business Tel",
                  "actions",
                ].map((key) => (
                  <TableHead
                    className={cn(
                      "text-start capitalize",
                      key === "actions" && "text-right"
                    )}
                    key={key}
                  >
                    {key}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {businesses.map(
                ({
                  id,

                  businessName,
                  businessTel,
                  businessEmail,
                  logoFile,
                  registerationNumber,
                  businessDescription,
                  businessAddress,
                  businessCity,
                  businessState,
                  businessCountry,
                  landmark,
                  certificateFile,
                }) => (
                  <TableRow key={id}>
                    <TableCell title={businessCountry}>
                      <Link href={logoFile.secure_url} target="_blank">
                        <div className="relative w-7 h-7 rounded">
                          {" "}
                          <Image
                            fill
                            src={logoFile.secure_url}
                            alt={businessName}
                          />
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell
                      title={businessName}
                      className="truncate"
                    >
                      {businessName}
                    </TableCell>
                    <TableCell title={registerationNumber}>
                      {registerationNumber}
                    </TableCell>
                    <TableCell title={businessEmail}>{businessEmail}</TableCell>
                    <TableCell
                      title={businessDescription}
                      className="max-w-60 truncate"
                    >
                      {businessDescription}
                    </TableCell>
                    <TableCell title={businessCountry}>
                      {businessCountry}
                    </TableCell>
                    <TableCell title={businessCity}>{businessCity}</TableCell>{" "}
                    <TableCell title={businessState}>{businessState}</TableCell>{" "}
                    <TableCell title={businessAddress}>
                      {businessAddress}
                    </TableCell>{" "}
                    <TableCell
                      title={landmark}
                      className="max-w-60 truncate"
                    >
                      {landmark}
                    </TableCell>
                    <TableCell title={certificateFile?.secure_url as string}>
                      <Link
                        href={(certificateFile?.secure_url as string) || ""}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "hover:no-underline"
                        )}
                      >
                        View
                        <Eye />
                      </Link>
                    </TableCell>
                    <TableCell title={businessTel}>
                      <Link
                        href={`tel:${businessTel}`}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "hover:no-underline"
                        )}
                      >
                        Call
                        <Phone />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleVerify({
                            businessId: id,
                          })
                        }
                        variant={"link"}
                        className="hover:no-underline cursor-pointer"
                      >
                        Verify
                        <CheckCircle />
                      </Button>

                      <Button
                        onClick={() => deleteBusiness({ businessId: id })}
                        variant={"link"}
                        className="text-destructive hover:no-underline"
                      >
                        Delete
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default Page;
