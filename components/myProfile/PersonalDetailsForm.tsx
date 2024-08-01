"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { userPersonalDetailsSchema as formSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";

export default function PersonalDetailsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      telephone: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={() => {}} className={"flex flex-col gap-y-6"}>
          <FormField
            control={form.control}
            name={"firstName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fist Name</FormLabel>
                <FormControl>
                  <Input placeholder={"First Name"} type={"text"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"lastName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder={"Last name"} type={"text"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"telephone"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone</FormLabel>
                <FormControl>
                  <Input placeholder={"Tel"} type={"text"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type={"submit"}>Save</Button>
        </form>
      </Form>
    </>
  );
}
