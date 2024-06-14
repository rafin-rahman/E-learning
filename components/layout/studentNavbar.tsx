"use client";
import Image from "next/image";
import { SEO } from "@/lib/company";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: {
  title: string;
  href: string;
  description: string;
  bg_color: string;
}[] = [
  {
    title: "Online Degree",
    href: "/docs/primitives/alert-dialog",
    description:
      "Access and manage your online degrees and academic progress here.",
    bg_color: "bg-gray-100",
  },
  {
    title: "Certified courses",
    href: "/docs/primitives/hover-card",
    description:
      "Track and manage your professional certifications and achievements here.",
    bg_color: "bg-gray-100",
  },
  {
    title: "Short Courses",
    href: "/docs/primitives/progress",
    description: "Manage and track your CPD courses and progress here.",
    bg_color: "bg-gray-100",
  },
  {
    title: "Academic Support",
    href: "/docs/primitives/scroll-area",
    description: "Get tutoring, study resources, and personalized assistance. ",
    bg_color: "",
  },
  {
    title: "Student Support",
    href: "/docs/primitives/tabs",
    description:
      "Assistance with academic success, well-being, and personal growth.",
    bg_color: "",
  },
  {
    title: "Technical Support",
    href: "/docs/primitives/tooltip",
    description:
      "Resolve issues, ensuring smooth, uninterrupted learning experiences.",
    bg_color: "",
  },
];

export default function StudentNavbar() {
  return (
    <div className={"h-20 bg-gray-100 flex items-center"}>
      <div className={"relative h-14 w-14 left-10"}>
        <Link href={"/"}>
          <Image
            src={SEO.logo_light_no_text}
            alt={"logo"}
            className={"  object-fill"}
            fill
          />
        </Link>
      </div>
      <div className={"ml-20 flex w-full text-black "}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={"rounded-none"}>
                Courses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/courses/allCourses"
                      >
                        {/*<Icons.logo className="h-6 w-6" />*/}
                        {/*<Bars4Icon className="h-6 w-6" />*/}
                        <div className="mb-2 text-lg font-medium">
                          Learn Online
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Online courses offer flexibility, convenience, and
                          access to diverse subjects, enabling balanced
                          education with personal commitments.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Online Degree">
                    Provide flexible, affordable education for diverse learners.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Certifications">
                    Boosts career prospects and enhances professional skills.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Short Courses"
                  >
                    Provide targeted learning and upskilling.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={"rounded-none"}>
                My learning
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      className={component.bg_color}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/studentSpace/myProfile" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  My profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Link
        href={"/logout"}
        className="absolute right-10 rounded-full border-8 border-gray-100 hover:border-gray-200"
      >
        <img
          className="h-8 w-8 rounded-full bg-gray-800"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <span className="sr-only">Your profile</span>
      </Link>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
