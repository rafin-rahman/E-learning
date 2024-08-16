import Image from "next/image";
import { SEO } from "@/lib/company";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { staffNavigationMenuOptions } from "@/lib/navigationMenuOptions";
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

import UserMenu from "@/components/layout/sidebarComponents/UserMenu";

export default function StaffNavbarMobile() {
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <div className={"h-20 bg-amber-300 flex items-center justify-around"}>
            <Sheet>
                <SheetTrigger asChild>
                    1
                    <Button variant={null}>
                        <Bars3Icon className={"h-10 w-10"} />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className={"bg-gray-900 "}>
                    <SheetHeader>
                        <SheetTitle className={"text-white"}>
                            Online Qualification
                        </SheetTitle>
                        <SheetDescription className={"text-white"}>
                            Menu
                        </SheetDescription>
                    </SheetHeader>
                    <div className={"mt-10"}>
                        {/*    Navigation menu options*/}
                        <nav className="flex flex-1 flex-col ">
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {staffNavigationMenuOptions.map(
                                            (item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? "bg-gray-800 text-white"
                                                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                                                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                        )}
                                                    >
                                                        <item.icon
                                                            className="h-6 w-6 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                        {item.count ? (
                                                            <span
                                                                className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                                                                aria-hidden="true"
                                                            >
                                                                {item.count}
                                                            </span>
                                                        ) : null}
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                                {/*<li>*/}
                                {/*  <div className="text-xs font-semibold leading-6 text-gray-400">*/}
                                {/*    Other options*/}
                                {/*  </div>*/}
                                {/*  <ul role="list" className="-mx-2 mt-2 space-y-1">*/}
                                {/*    {teams.map((team) => (*/}
                                {/*      <li key={team.name}>*/}
                                {/*        <a*/}
                                {/*          href={team.href}*/}
                                {/*          className={classNames(*/}
                                {/*            team.current*/}
                                {/*              ? "bg-gray-800 text-white"*/}
                                {/*              : "text-gray-400 hover:text-white hover:bg-gray-800",*/}
                                {/*            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"*/}
                                {/*          )}*/}
                                {/*        >*/}
                                {/*          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">*/}
                                {/*            {team.initial}*/}
                                {/*          </span>*/}
                                {/*          <span className="truncate">{team.name}</span>*/}
                                {/*        </a>*/}
                                {/*      </li>*/}
                                {/*    ))}*/}
                                {/*  </ul>*/}
                                {/*</li>*/}
                            </ul>
                        </nav>
                    </div>
                    <SheetFooter className={"bottom-0"}>
                        <div className="-mx-6 mt-auto ">
                            <UserMenu firstName={"Rafin"} lastName={"Rahman"} />
                        </div>
                        <SheetClose asChild className={"text-white"}>
                            X
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
