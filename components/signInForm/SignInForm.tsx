"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { signInFormSchema as formSchema } from "@/lib/zodSchema.js";
import SignInFormField from "@/components/signInForm/SignInFormField";
import signInAction from "../../app/signin/signInAction";
import { useToast } from "@/components/ui/use-toast";

const SignInForm = () => {
  const [errorMessage, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const signInEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (signInEmailRef.current) {
      console.log("use effect signinform");
      signInEmailRef.current.focus();
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // this is an empty object, it helps to show form error messages from ZOD library
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      const response = await signInAction({}, formData);
      if (response) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Notification",
          description: response,
          duration: 2000,
        });
      }
    } catch (err) {
      setLoading(false);
      console.error("Error during sign-in:", err);

      toast({
        variant: "destructive",
        title: "Notification",
        description: "An unexpected error occurred. Please try again.",
        duration: 2000,
      });
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
            ref={signInEmailRef}
          />
          <SignInFormField
            name={"password"}
            label={"Password"}
            inputType={"password"}
            placeholder={"password"}
            description={"Password must be at least 6 characters"}
            formControl={form.control}
          />

          <Button type={"submit"} className={"mt-2"} disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
