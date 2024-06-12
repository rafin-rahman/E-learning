// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { cookies } from "next/headers";
//
// export default function Homepage() {
//   // check if the user is authenticated
//   const userCookie = cookies().get("Authorization"); // Replace 'user-token' with your actual cookie name
//
//   const isAuthenticated = !!userCookie;
//   return (
//     <div
//       className={
//         "container text-center  flex flex-col justify-center items-center min-h-screen "
//       }
//     >
//       <div className={"w-full flex justify-center"}>
//         <Image
//           src={"logo/Logo-LightBG.svg"}
//           alt={"logo"}
//           width={200}
//           height={200}
//         />
//       </div>
//       <p className={"mt-10"}>Learn anywhere, anytime</p>
//       {!isAuthenticated && (
//         <Button
//           asChild
//           variant={"destructive"}
//           className={"m-10 sm:w-1/2 w-full"}
//         >
//           <Link href={"signin"}>Sign in</Link>
//         </Button>
//       )}
//       {!isAuthenticated && (
//         <Button asChild variant={"default"} className={"m-10 sm:w-1/2 w-full"}>
//           <Link href={"signup"}>Register an account as a STUDENT</Link>
//         </Button>
//       )}
//
//       {isAuthenticated && (
//         <Button asChild variant={"ghost"} className={"m-10 w-72 mx-auto"}>
//           <Link href={"dashboard"}>
//             {"< "}Dashboard <span className={"font-light"}>[staff only]</span>
//           </Link>
//         </Button>
//       )}
//       {isAuthenticated && (
//         <Button asChild variant={"ghost"} className={"m-10 sm:w-1/2 w-full"}>
//           <Link href={"studentSpace"}>
//             {"< "}Student Space
//             <span className={"font-light"}>[Student only]</span>
//           </Link>
//         </Button>
//       )}
//
//       {isAuthenticated && (
//         <Button
//           asChild
//           variant={"destructive"}
//           className={"m-10 sm:w-1/2 w-full"}
//         >
//           <Link href={"logout"}>Logout</Link>
//         </Button>
//       )}
//     </div>
//   );
// }

import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExploreSubjectsTabs } from "@/components/student/studentSpace/ExploreSubjectsTabs";
import Link from "next/link";

export default function StudentSpace() {
  const logoUrl = [
    {
      id: 1,
      url: "/images/partner_logos/Johns Hopkins University.png",
    },
    {
      id: 2,
      url: "/images/partner_logos/King's College London.png",
    },
    {
      id: 3,
      url: "/images/partner_logos/Massachusetts Institute of Technology.png",
    },
    {
      id: 4,
      url: "/images/partner_logos/University of British Columbia.png",
    },
    {
      id: 5,
      url: "/images/partner_logos/Vanderbilt University.png",
    },
    {
      id: 6,
      url: "/images/partner_logos/Massachusetts Institute of Technology.png",
    },
    {
      id: 7,
      url: "/images/partner_logos/University of British Columbia.png",
    },
  ];

  function LogoCard() {
    return (
      <div
        className={
          "flex flex-wrap items-center justify-center gap-24 bg-white  p-10 rounded-2xl shadow-lg w-full "
        }
      >
        {logoUrl.map((logo) => (
          <div key={logo.id}>
            <Image src={logo.url} alt={"logo"} width={200} height={200} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={"relative container my-20"}>
      <div className={"fixed top-0 left-0 w-full h-full -z-10"}>
        <Image
          src={"/images/backgrounds/red background image.jpg"}
          alt={"logo"}
          className={"absolute object-cover h-1/2 blur-3xl -z-10 opacity-20"}
          fill
        />
      </div>
      <div className={"relative sm:mx-32"}>
        <h1 className={"text-4xl sm:text-9xl  font-black mb-10 w-1/2"}>
          <span className={"text-red-400"}>Progress</span> your way
        </h1>
        <div
          className={
            "flex flex-wrap items-center justify-start gap-24 w-full mt-24"
          }
        >
          <div className={"flex flex-col space-y-4"}>
            <div>4.58 average rating</div>
            <div className={"flex gap-2 items-center"}>
              <StarIcon className={"h-4"} fill={"rgba(0, 0, 0, 0.5)"} />
              <StarIcon className={"h-4"} fill={"rgba(0, 0, 0, 0.5)"} />
              <StarIcon className={"h-4"} fill={"rgba(0, 0, 0, 0.5)"} />
              <StarIcon className={"h-4"} fill={"rgba(0, 0, 0, 0.5)"} />
              <StarIcon className={"h-4"} />
              184,681 learner reviews
            </div>
            <div>
              Powered by <span className={"font-bold text-red-500"}>yotpo</span>
              .
            </div>
          </div>
          <div className={"w-64 font-medium leading-6"}>
            Make your 2024 count. Get Unlimited and access 1400+ online courses
            from top universities.{" "}
          </div>
          <Button className={"bg-red-500 h-14"}>Get Unlimited learning</Button>
          <Button
            variant={"outline"}
            className={
              "bg-transparent border-black hover:bg-black hover:text-white hover:border-none h-14"
            }
          >
            <Link href={"/studentSpace/allCourses"}>Explore courses</Link>
          </Button>
        </div>
      </div>

      <div className={"bg-white p-10 my-10 mt-24 rounded-2xl shadow-lg w-full"}>
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 text-center">
            <div className={"flex flex-col items-center"}>
              <h2 className={"text-4xl font-black"}>Explore top subjects</h2>
              <div className={"w-20 bg-red-500 h-1 mt-3"}></div>
            </div>
          </div>
        </div>
        <ExploreSubjectsTabs />
      </div>
      <h2 className={"text-4xl text-center font-black my-40"}>
        Learn with <span className={"text-red-500"}>200+</span> world-class
        institutions and educators
      </h2>
      <LogoCard />
    </div>
  );
}
