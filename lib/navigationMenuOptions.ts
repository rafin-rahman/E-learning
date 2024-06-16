import {
  BriefcaseIcon,
  QueueListIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const staffNavigationMenuOptions = [
  {
    name: "Manage Users",
    href: "/dashboard/admin/manageUsers",
    icon: UsersIcon,
    count: "",
    current: false,
    // leave [""] if no allowedRoles, do not leave [] or the user will not see the option
    allowedRoles: [""],
  },
  {
    name: "Manage Courses",
    href: "/dashboard/admin/manageCourses",
    icon: QueueListIcon,
    count: "",
    current: false,
    allowedRoles: ["COURSE_MANAGER"],
  },
  {
    name: "Manage Businesses",
    href: "/dashboard/business/manage",
    icon: BriefcaseIcon,
    count: "",
    current: false,
    allowedRoles: ["BUSINESS_ADMIN"],
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
