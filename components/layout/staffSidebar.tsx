import Image from "next/image";
import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";
import UserMenu from "@/components/layout/sidebarComponents/UserMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SEO } from "@/lib/company";
import { staffNavigationMenuOptions } from "@/lib/navigationMenuOptions";

//TODO sidebar navigation needs to highlight the current page
const navigation = staffNavigationMenuOptions;
const teams = [
  { id: 1, name: "Option1", href: "#", initial: "1", current: false },
  { id: 2, name: "Option2", href: "#", initial: "2", current: false },
  { id: 3, name: "Option3", href: "#", initial: "3", current: false },
];

async function fetchUserInfo(id: string) {
  let loggedUserData;
  const userData = await fetch(
    `${process.env.NEXT_PUBLIC_LOCALHOST_URL}/api/user`,
    {
      method: "POST",
      body: JSON.stringify({ userId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!userData.ok) {
    const studentData = await fetch(
      `${process.env.NEXT_PUBLIC_LOCALHOST_URL}/api/student`,
      {
        method: "POST",
        body: JSON.stringify({ studentId: id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!studentData.ok) {
      return null;
    }
    loggedUserData = await studentData.json();
    return loggedUserData;
  }
  loggedUserData = await userData.json();

  return loggedUserData;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default async function StaffSidebar() {
  // check if the user is authenticated by looking for a specific cookie
  const userCookie = cookies().get("Authorization");
  //use jose to find user info from the cookie
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  let userId: string | undefined;

  if (userCookie) {
    const jwt = userCookie.value;
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    userId = payload.sub;
  }

  if (!userId) {
    redirect("/logout");
  }

  let validatedUser;
  if (userId) {
    validatedUser = await fetchUserInfo(userId);
    if (!validatedUser) {
      console.log(
        "sidebar.tsx - User info not found when using fetchUserInfo() function"
      );
      redirect("/somethingWrong");
    }
  }

  return (
    <div className="flex pt-4 grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6  h-screen sticky top-0">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          className="h-8 w-auto"
          src={SEO.logo_dark_no_text}
          alt="Online Qualification"
          width={100}
          height={100}
          priority
        />
        <span className={"text-white ml-3"}>Online Qualification</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
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
              ))}
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
          <li className="-mx-6 mt-auto">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className={"w-full"}>
                    <UserMenu
                      firstName={validatedUser.firstName}
                      lastName={validatedUser.lastName}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      User role: <br />
                      {validatedUser.role.map((role: string) => {
                        return (
                          <div>
                            - {role} <br />
                          </div>
                        );
                      })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}