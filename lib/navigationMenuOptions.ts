import {
	BriefcaseIcon,
	QueueListIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";

export const staffNavigationMenuOptions = [
	{
		name: "Manage Users",
		href: "/oq-staff/manage-users",
		icon: UsersIcon,
		count: "",
		current: false,
		// leave [""] if no allowedRoles, do not leave [] or the user will not see the option
		allowedRoles: [""],
	},
	{
		name: "Manage Courses",
		href: "/oq-staff/manage-courses",
		icon: QueueListIcon,
		count: "",
		current: false,
		allowedRoles: ["COURSE_MANAGER"],
	},
	{
		name: "Manage Businesses",
		href: "/oq-staff/manage-businesses",
		icon: BriefcaseIcon,
		count: "",
		current: false,
		allowedRoles: ["COMPANY_ADMIN"],
	},
];

export const publicNavigationMenuOptions = [
	{
		name: "Courses",
		href: "#",
		icon: UsersIcon,
		count: "",
		current: false,
		// leave [""] if no allowedRoles, do not leave [] or the user will not see the option
		allowedRoles: [""],
	},
	{
		name: "E-Learning for business",
		href: "#",
		icon: UsersIcon,
		count: "",
		current: false,
		// leave [""] if no allowedRoles, do not leave [] or the user will not see the option
		allowedRoles: [""],
	},
	{
		name: "About us",
		href: "/about-us",
		icon: UsersIcon,
		count: "",
		current: false,
		// leave [""] if no allowedRoles, do not leave [] or the user will not see the option
		allowedRoles: [""],
	},
	{
		name: "Contact us",
		href: "/contact-us",
		icon: UsersIcon,
		count: "",
		current: false,
		// leave [""] if no allowedRoles, do not leave [] or the user will not see the option
		allowedRoles: [""],
	},
];

// export const studentNavigationMenuOptions = [
//   {
//     name: "Courses",
//     href: "/studentSpace/homeApp",
//     icon: HomeIcon,
//     count: "",
//     current: false,
//   },
//   {
//     name: "My Learning",
//     href: "/studentSpace/myCourses",
//     icon: QueueListIcon,
//     count: "",
//     current: false,
//   },
//   {
//     name: "My Profile",
//     href: "/studentSpace/myProfile",
//     icon: QueueListIcon,
//     count: "",
//     current: false,
//   },
// ];
