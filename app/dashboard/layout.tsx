import Sidebar from "@/components/layout/sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={"flex"}>
        <div className={"w-1/6"}>
          <Sidebar />
        </div>
        <div className={"mt-4"}> {children}</div>
      </div>
    </>
  );
}
