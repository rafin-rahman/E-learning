import StudentNavbar from "@/components/layout/studentNavbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StudentNavbar />
      <div className={"mt-4 w-full"}> {children}</div>
    </>
  );
}
