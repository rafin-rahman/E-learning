import StaffSidebar from "@/components/layout/staffSidebar";
import StaffNavbarMobile from "@/components/layout/staffNavbarMobile";
import Image from "next/image";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className={"w-full block sm:hidden "}>
                <StaffNavbarMobile />
            </div>
            <div className={"flex"}>
                <div className={"hidden sm:block"}>
                    <StaffSidebar />
                </div>

                <div className={"w-full"}>{children}</div>
            </div>
        </>
    );
}
