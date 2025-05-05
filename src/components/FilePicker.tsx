"use client";
import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FilePicker = ({
  className,
  id,
  type,
  placeholder,
  label,
  control,
  acceptedSize = 1,
  accept = "image/png, image/jpeg",
}: {
  className?: string;
  id: string;
  type: string;
  label: string;
  placeholder: string;
  accept?: string;
  acceptedSize?: number;
  control: Control<FieldValues, unknown, FieldValues> | undefined;
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const fileTypes = accept.includes("mp4")
    ? "MP4"
    : accept.includes("pdf")
    ? "PDF"
    : "PNG, JPEG";
  const handleFilePick =  (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    const size = file.size / (1024 * 1024);
    if (size > acceptedSize) {
      toast("File too large");
      return;
    }
    const url = URL.createObjectURL(file);
    setSelectedFile(url);
    return file;
  };

  return (
    <FormField
      control={control}
      name={id}
      render={({ field: { onChange, ...field } }) => (
        <FormItem className="w-full">
          <FormLabel
            htmlFor={id}
            className={cn(
              "w-full min-h-48 rounded-md bg-muted px-2 py-2 flex flex-col items-center justify-center dark:bg-input/30 border-input",
              className
            )}
          >
            <div className="relative w-full h-full rounded-md flex flex-col items-center justify-center">
              {selectedFile ? (
                <Image
                  className="rounded-md object-contain"
                  src={selectedFile}
                  alt={id}
                  fill
                />
              ) : (
                <div className="flex flex-col items-center font-light space-y-2">
                  <UploadCloud
                    className="text-primary"
                    size={100}
                    strokeWidth={1}
                  />
                  <p>{label}</p>
                  <p>
                    {fileTypes} files only not more than {acceptedSize}mb
                  </p>
                </div>
              )}
            </div>
          </FormLabel>
          <FormControl>
            <div>
              <Input
                id={id}
                onChange={(e) => onChange(handleFilePick(e))}
                type={type}
                accept={accept}
                className="hidden py-2"
                placeholder={placeholder}
                {...field}
                value={""}
              />
            </div>
          </FormControl>
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
};
export default FilePicker;
