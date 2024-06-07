import StaffSidebar from "@/components/layout/staffSidebar";
import StaffMobileNavbar from "@/components/layout/staffMobileNavbar";

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
        <div className={"w-1/6 hidden sm:block"}>
          <StaffSidebar />
        </div>

        <div className={"mt-4 w-full"}> {children}</div>
      </div>
    </>
  );
}
