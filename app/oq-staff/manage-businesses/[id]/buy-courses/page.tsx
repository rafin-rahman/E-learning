import BuyCoursesCard from "@/components/business/BuyCoursesCard";

export default function BuyCourses({ params }: { params: { id: string } }) {
  return (
    <div className={"container"}>
      <BuyCoursesCard companyId={params.id} userType={"oq-staff"} />
    </div>
  );
}
