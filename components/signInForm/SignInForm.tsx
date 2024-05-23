"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { signInFormSchema as formSchema } from "@/lib/zodSchema.js";
import SignInFormField from "@/components/signInForm/SignInFormField";
import signInAction from "../../app/signin/signInAction";

export default function SignInForm() {
  const [errorMessage, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // this is an empty object, it helps to show form error messages from ZOD library
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      const errorMessage = await signInAction({}, formData);
      if (errorMessage) {
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={"m-4 "}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SignInFormField
            name={"email"}
            label={"Email"}
            inputType={"email"}
            placeholder={"email"}
            formControl={form.control}
          />
          <SignInFormField
            name={"password"}
            label={"Password"}
            inputType={"password"}
            placeholder={"password"}
            description={"Password must be at least 6 characters"}
            formControl={form.control}
          />

          <Button type={"submit"} className={"mt-2"}>
            Sign In
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </Form>
    </div>
  );
}
