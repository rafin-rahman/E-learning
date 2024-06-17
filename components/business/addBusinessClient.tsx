"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { createBusinessClientSchema as formSchema } from "@/lib/zodSchema";

export function AddBusinessClient() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={"rounded-full text-xl"}>+</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new business</DialogTitle>
            <DialogDescription>
              Make sure the business is approved.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className={"rounded-full text-xl"}>+</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add new business</DrawerTitle>
          <DrawerDescription>
            Make sure the business is approved.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortName: "",
      logo: "",
      domains: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values");
    console.log(values);
  };
  return (
    <div className={"mx-4 sm:mx-0"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Legal business Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"e.g. Online Qualifications LTD"}
                    {...field}
                    type={"text"}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>{" "}
          <FormField
            control={form.control}
            name={"shortName"}
            render={({ field }) => (
              <FormItem className={"mt-4"}>
                <Label>Short form</Label>
                <FormControl>
                  <Input placeholder={"e.g. OQ"} {...field} type={"text"} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={"logo"}
            render={({ field }) => (
              <FormItem className={"mt-4"}>
                <FormLabel>Upload logo</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      {...field}
                      type={"file"}
                      accept={"image/png, image/jpeg, image/jpg"}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>{" "}
          <FormField
            control={form.control}
            name={"domains"}
            render={({ field }) => (
              <FormItem className={"mt-4"}>
                <FormLabel>Domains</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"e.g. oq.com, onlinequalification.com"}
                    {...field}
                    type={"text"}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button type={"submit"} className={"mt-4 w-full"}>
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
