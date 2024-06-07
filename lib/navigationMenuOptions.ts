import {
  BeakerIcon,
  HomeIcon,
  QueueListIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const staffNavigationMenuOptions = [
  {
    name: "Home",
    href: "/dashboard/homeApp",
    icon: HomeIcon,
    count: "",
    current: false,
  },
  {
    name: "Manage Courses",
    href: "/dashboard/admin/manageCourses",
    icon: QueueListIcon,
    count: "",
    current: false,
  },
  {
    name: "Manage Users",
    href: "/dashboard/admin/manageUsers",
    icon: UsersIcon,
    count: "",
    current: false,
  },
  {
    name: "File upload [beta]",
    href: "/dashboard/admin/uploadFile",
    icon: BeakerIcon,
    count: "",
    current: false,
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
