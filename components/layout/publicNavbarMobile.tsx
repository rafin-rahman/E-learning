import Image from "next/image";
import { SEO } from "@/lib/company";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { publicNavigationMenuOptions } from "@/lib/navigationMenuOptions";
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

export default function PublicNavbarMobile() {
	function classNames(...classes: any) {
		return classes.filter(Boolean).join(" ");
	}
	return (
		<div className={"h-20  flex items-center justify-around"}>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant={null}>
						<Bars3Icon className={"h-10 w-10"} />
					</Button>
				</SheetTrigger>
				<SheetContent side={"left"} className={" "}>
					<SheetHeader>
						<SheetTitle className={""}>
							Online Qualification
						</SheetTitle>
						<SheetDescription className={""}>Menu</SheetDescription>
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
										{publicNavigationMenuOptions.map(
											(item) => (
												<li
													key={item.name}
													className={"py-3"}
												>
													<a
														href={item.href}
														className={classNames(
															item.current
																? "bg-gray-800"
																: "text-gray-600 hover:text-white  hover:bg-gray-800",
															"group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
														)}
													>
														{item.name}
														{item.count ? (
															<span
																className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5  ring-1 ring-inset ring-gray-700"
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
					<SheetFooter className={"bottom-0 mt-10"}>
						<SheetClose className={""}>Close</SheetClose>
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
