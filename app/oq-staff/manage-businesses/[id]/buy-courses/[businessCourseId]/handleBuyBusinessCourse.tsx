import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

export default function handleBuyBusinessCourse({
  courseQuantity,
  courseId,
  businessId,
}: {
  courseQuantity: number;
  courseId: string;
  businessId: string;
}) {
  const buyLicenses = "";

  const { data, isLoading, error }: UseQueryResult = useQuery({
    queryKey: ["buyIndividualBusinessCourse", courseId],
    queryFn: () => {},
  });

  if (isLoading) {
    return <div>Loading </div>;
  }

  return "";
}
