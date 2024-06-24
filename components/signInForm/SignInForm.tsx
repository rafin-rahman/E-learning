"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { signInFormSchema as formSchema } from "@/lib/zodSchema.js";
import SignInFormField from "@/components/signInForm/SignInFormField";
import signInAction from "../../app/signin/signInAction";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const signInEmailRef = useRef<HTMLInputElement>(null);
  const [userType, setUserType] = useState<string>("");

  useEffect(() => {
    if (signInEmailRef.current) {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("userType", userType);

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
          <div className={"mt-2"}></div>
          <FormLabel>Select user type</FormLabel>
          <div className={"mt-2"}></div>
          <Select onValueChange={setUserType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="staff">OQ Staff</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="companyEmployee">Business</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button type={"submit"} className={"mt-2"} disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
