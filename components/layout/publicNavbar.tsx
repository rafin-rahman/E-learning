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
import { Button } from "@/components/ui/button";
import { publicNavigationMenuOptions } from "@/lib/navigationMenuOptions";

type PublicNavbarProps = {
	isLoggedIn: boolean;
};

const PublicNavbar: React.FC<PublicNavbarProps> = ({ isLoggedIn }) => {
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
	return (
		<div className={"h-20 bg-gray-100 flex items-center"}>
			<Link href={"/studentSpace"}>
				<div className="relative h-14 w-14 ml-10">
					{" "}
					{/* Apply relative positioning here */}
					<Image src={SEO.logo_light_no_text} alt="logo" fill priority />
				</div>
			</Link>
			<div className={"ml-20 flex w-full text-black "}>
				<NavigationMenu>
					<NavigationMenuList>
						{isLoggedIn && (
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
						)}
						{isLoggedIn && (
							<NavigationMenuItem>
								<Link href="/studentSpace/myProfile" legacyBehavior passHref>
									<NavigationMenuLink
										className={`${navigationMenuTriggerStyle()} rounded-none`}
									>
										My profile
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						)}

						{/*{!isLoggedIn && (*/}
						{/*    <NavigationMenuItem>*/}
						{/*        <Link href="#" legacyBehavior passHref>*/}
						{/*            <NavigationMenuLink*/}
						{/*                className={`${navigationMenuTriggerStyle()} rounded-none`}*/}
						{/*            >*/}
						{/*                E-Learning for business*/}
						{/*            </NavigationMenuLink>*/}
						{/*        </Link>*/}
						{/*    </NavigationMenuItem>*/}
						{/*)}*/}
						{/*{!isLoggedIn && (*/}
						{/*    <NavigationMenuItem>*/}
						{/*        <Link href="/about-us" legacyBehavior passHref>*/}
						{/*            <NavigationMenuLink*/}
						{/*                className={`${navigationMenuTriggerStyle()} rounded-none`}*/}
						{/*            >*/}
						{/*                About us*/}
						{/*            </NavigationMenuLink>*/}
						{/*        </Link>*/}
						{/*    </NavigationMenuItem>*/}
						{/*)}*/}

						{/*{!isLoggedIn && (*/}
						{/*    <NavigationMenuItem>*/}
						{/*        <Link*/}
						{/*            href="/contact-us"*/}
						{/*            legacyBehavior*/}
						{/*            passHref*/}
						{/*        >*/}
						{/*            <NavigationMenuLink*/}
						{/*                className={`${navigationMenuTriggerStyle()} rounded-none`}*/}
						{/*            >*/}
						{/*                Contact us*/}
						{/*            </NavigationMenuLink>*/}
						{/*        </Link>*/}
						{/*    </NavigationMenuItem>*/}
						{/*)}*/}

						{!isLoggedIn &&
							publicNavigationMenuOptions.map((item) => {
								return (
									<NavigationMenuItem key={item.name}>
										<Link href={item.href} legacyBehavior passHref>
											<NavigationMenuLink
												className={`${navigationMenuTriggerStyle()} rounded-none`}
											>
												{item.name}
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								);
							})}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			{isLoggedIn ? (
				<div className={"flex gap-4"}>
					<Button
						className={
							"relative  right-10 w-full bg-gradient-to-r from-amber-300 to-red-400 hover:from-amber-300 hover:via-amber-400  hover:to-red-400 "
						}
					>
						<Link href={"/oq-staff"} className="font-black">
							Go to Portal
							<span> oq-staff</span>
						</Link>
					</Button>
					<Button variant={"default"} className={"relative w-24 right-10 "}>
						<Link href={"/auth/logout"} className="">
							Logout
						</Link>
					</Button>
				</div>
			) : (
				<Button asChild variant={"default"} className={"relative w-24 right-10 "}>
					<Link href={"/auth/signin"} className="">
						Login
					</Link>
				</Button>
			)}
		</div>
	);
};

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

export default PublicNavbar;
