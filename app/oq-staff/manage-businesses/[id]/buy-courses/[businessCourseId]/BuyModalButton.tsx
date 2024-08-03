import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BuyModalButton({
  quantity,
  totalValue,
}: {
  quantity: number;
  totalValue: number;
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
          {totalValue}
          <DialogDescription>
            <br />
            Ensure you received the payment before adding the licences.
          </DialogDescription>
          <br />
          <Button>Add licences</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
