import { cookies } from "next/headers";

import Homepage from "@/components/homepage/homepage";
import PublicNavbar from "@/components/layout/publicNavbar";
import PublicNavbarMobile from "@/components/layout/publicNavbarMobile";
import Footer from "@/components/layout/sidebarComponents/Footer";

export default function Home() {
    const cookie = cookies().get("Authorization");
    // Check if the user is logged in, return a boolean
    const isLoggedIn = !!cookie;

    const list = [
        {
            title: "dashboard",
            description: "Something went wrong",
        },
        {
            title: "dashboard",
            description: "Something went wrong",
        },
    ];

    return (
        <div>
            <div className={"hidden sm:block"}>
                <PublicNavbar isLoggedIn={isLoggedIn} />
            </div>
            <div className={"sm:hidden"}>
                <PublicNavbarMobile />
            </div>
            <Homepage />
            <Footer />
        </div>
    );
}
