import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, count: "5", current: true },
  {
    name: "Courses",
    href: "/dashboard/manage_courses",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Users",
    href: "#",
    icon: FolderIcon,
    count: "12",
    current: false,
  },
];
const teams = [
  { id: 1, name: "Option", href: "#", initial: "1", current: false },
  { id: 2, name: "Option", href: "#", initial: "2", current: false },
  { id: 3, name: "Option", href: "#", initial: "3", current: false },
];

let userInfo: any = {};

async function fetchUserInfo(userId: string) {
  const response = await fetch(`${process.env.LOCALHOST_URL}/api/user`, {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    redirect("/logout");
    const data = await response.json();

    // logout user using logoutAction
    throw new Error("Error: " + data.error || "An error occurred");
  }
  const data = await response.json();
  return data;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default async function Sidebar() {
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
  if (userId) {
    try {
      userInfo = await fetchUserInfo(userId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 h-full min-h-screen">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          className="h-8 w-auto"
          src="/logo/Logo-DarkBG-no-text.svg"
          alt="Online Qualification"
          width={120}
          height={32}
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
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Other options
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <a
                    href={team.href}
                    className={classNames(
                      team.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">
                {userInfo.firstName} {userInfo.lastName}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
