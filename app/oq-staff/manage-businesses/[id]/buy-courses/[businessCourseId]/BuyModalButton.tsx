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
import { useQuery, UseQueryResult, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SEO } from "@/lib/company";

type BuyBusinessCourse = {
    businessId: string;
    courseId: string;
    courseQuantity: number;
};

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
    const buyCourse = ({
        courseQuantity,
        courseId,
        businessId,
    }: BuyBusinessCourse) => {
        return axios.post("/api/oq-business/buy-courses", {
            courseQuantity,
            courseId,
            businessId,
        });
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Buy</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={"text-center"}>
                        Attention!
                    </DialogTitle>
                    You are about to allocate {quantity} licenses - Total value{" "}
                    {formatCurrencyToGBP(totalValue)}
                    <DialogDescription>
                        <br />
                        Ensure you received the payment before adding the
                        licences.
                    </DialogDescription>
                    <br />
                    <Button
                        onClick={() => {
                            buyCourse({
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
