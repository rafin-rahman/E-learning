import PublicNavbar from "@/components/layout/publicNavbar";
import Footer from "@/components/layout/sidebarComponents/Footer";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNavbar isLoggedIn={true} />
      <div className={"mt-4 w-full"}>{children}</div>
      <Footer />
    </>
  );
}
