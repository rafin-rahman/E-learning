"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file as Blob);

    const response = await fetch(
      process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );
  };
  return (
    <div
      className={"container mt-20 flex items-center justify-center flex-col"}
    >
      <h1 className={"text-4xl mb-10 "}>File upload</h1>
      <form onSubmit={handleSubmit}>
        <Input
          className={"h-20"}
          type={"file"}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button type={"submit"} className={"w-full mt-4"}>
          Submit
        </Button>
      </form>
    </div>
  );
}
