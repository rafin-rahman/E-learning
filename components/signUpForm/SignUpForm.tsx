"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import React from "react";
import { signUpFormSchema as formSchema } from "@/lib/zodSchema.js";
import CustomFormField from "@/components/signUpForm/CustomFormField";

export default function SignUpForm() {
  const [serverMessage, setServerMessage] = React.useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // set serverMessage for 2 seconds then reset it to empty string
    setServerMessage(data.message);
    setTimeout(() => {
      setServerMessage("");
    }, 2000);
  };

  return (
    <div className={"m-4 "}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CustomFormField
            name={"firstName"}
            label={"First Name"}
            placeholder={"First Name"}
            formControl={form.control}
          />
          <CustomFormField
            name={"lastName"}
            label={"Last Name"}
            placeholder={"Last Name"}
            formControl={form.control}
          />
          <CustomFormField
            name={"email"}
            label={"Email"}
            inputType={"email"}
            placeholder={"email"}
            formControl={form.control}
          />
          <CustomFormField
            name={"password"}
            label={"Password"}
            inputType={"password"}
            placeholder={"password"}
            description={"Password must be at least 6 characters"}
            formControl={form.control}
          />

          <Button type={"submit"} className={"mt-2"}>
            Sign up
          </Button>
          {serverMessage && <p>{serverMessage}</p>}
        </form>
      </Form>
    </div>
  );
}
