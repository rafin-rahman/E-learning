import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrencyToGBP } from "@/lib/utils";
import handleBuyBusinessCourse from "@/app/oq-staff/manage-businesses/[id]/buy-courses/[businessCourseId]/handleBuyBusinessCourse";

export default function BuyModalButton({
  quantity,
  totalValue,
  businessId,
  courseId,
}: {
  quantity: number;
  totalValue: number;
  courseId: string;
  businessId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Buy</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-center"}>Attention!</DialogTitle>
          You are about to allocate {quantity} licenses - Total value{" "}
          {formatCurrencyToGBP(totalValue)}
          <DialogDescription>
            <br />
            Ensure you received the payment before adding the licences.
          </DialogDescription>
          <br />
          <Button
            onClick={() => {
              handleBuyBusinessCourse({
                courseQuantity: quantity,
                courseId,
                businessId,
              });
            }}
          >
            Add licences
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
