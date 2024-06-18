import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  FormMessage,
} from "@/components/ui/form";
import { CountrySelect } from "@/components/business/countrySelect";

import { createBusinessClientSchema as formSchema } from "@/lib/zodSchema";
import addBusinessAction from "@/app/dashboard/business/manage/addBusinessAction";

export function AddBusinessClient() {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={"rounded-full text-xl bg-opacity-50 bg-black shadow-xl"}
          >
            +
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]3">
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
        <Button
          className={"rounded-full text-xl bg-opacity-50 bg-black shadow-xl"}
        >
          +
        </Button>
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
  const [logo, setLogo] = React.useState<File | null>(null);
  const [domains, setDomains] = React.useState<string[]>([]);
  const [countryFromImportedComponent, setCountryFromImportedComponent] =
    React.useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortName: "",
      country: "",
      logo: "",
      domains: "",
    },
  });

  const DomainsBadge = domains.map((domain) => {
    return (
      <Badge variant={"secondary"} key={domain} className={"mr-2"}>
        {domain}
      </Badge>
    );
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("shortName", values.shortName || "");
      formData.append("country", countryFromImportedComponent);
      formData.append("logo", logo as Blob);
      formData.append("domains", values.domains);
      // Call API to create business
      const response = await addBusinessAction(formData);
    } catch (error) {}
  };

  const getCountry = (country: string) => {
    console.log(country);
    setCountryFromImportedComponent(country);
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={"country"}
            render={({ field }) => (
              <FormItem className={"mt-4"}>
                <Label>Country</Label>
                <FormControl>
                  <div className={"mt-6"}>
                    <CountrySelect callback={getCountry} />
                    <Input
                      {...field}
                      type={"text"}
                      value={countryFromImportedComponent}
                      className={"hidden"}
                    />
                  </div>
                </FormControl>
                <FormMessage />
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
                      onChange={(e) => {
                        setLogo(e.target.files?.[0] || null);
                        field.onChange(e);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
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
                    // onChange update the domains state with the new value, remove all spaces
                    // if user enters "hello.com, hi.io ,tesst.com    ,bye.com" it will be converted to "hello.com,hi.io,tesst.com,bye.com"
                    onChange={(e) => {
                      const value = e.target.value;
                      setDomains(
                        value
                          .replace(/\s/g, "")
                          .split(",")
                          .filter((domain) => domain.length > 0)
                      );
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className={"mt-4"}>{DomainsBadge}</div>
          <Button type={"submit"} className={"mt-4 w-full"}>
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
