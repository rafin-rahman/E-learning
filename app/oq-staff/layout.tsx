import StaffSidebar from "@/components/layout/staffSidebar";
import StaffMobileNavbar from "@/components/layout/staffMobileNavbar";
import Image from "next/image";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={"w-full block sm:hidden "}>
        <StaffMobileNavbar />
      </div>
      <div className={"flex"}>
        <div className={"hidden sm:block"}>
          <StaffSidebar />
        </div>

        <div className={"mt-4 w-full"}>
          <div className={"fixed top-0 left-0 w-full h-full -z-10 bg-white bg-opacity-50"}>
            <Image
              src={"/images/backgrounds/dashboard bg.jpg"}
              alt={"logo"}
              className={
                "absolute object-cover h-1/2 blur-2xl -z-10 opacity-30"
              }
              fill
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
