import Image from "next/image";
import { SEO } from "@/lib/company";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function StaffMobileNavbar() {
  return (
    <div className={"h-20 bg-amber-300 flex items-center justify-around"}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={null}>
            <Bars3Icon className={"h-10 w-10"} />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Online Qualification</SheetTitle>
            <SheetDescription>Menu</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className={"relative h-10 w-20"}>
        <Image
          className={"object-fill"}
          src={SEO.logo_light_no_text}
          alt={"logo"}
          fill
        />
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
