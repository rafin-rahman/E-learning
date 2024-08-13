import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrencyToGBP } from "@/lib/utils";
import { useQuery, UseQueryResult, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SEO } from "@/lib/company";
import { useState } from "react";
import BuyCourses from "@/app/oq-staff/manage-businesses/[id]/buy-courses/page";

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
    const [modalCloseButton, setModalCloseButton] = useState(false);
    const buyCourseObject = {
        courseQuantity: quantity,
        courseId: courseId,
        businessId: businessId,
    };

    const buyCourse = (buyCourseObject: BuyBusinessCourse) => {
        return axios.post("/api/oq-business/buy-courses", buyCourseObject);
    };

    const buyCourseMutation = useMutation({
        mutationFn: (buyCourseObject: BuyBusinessCourse) =>
            buyCourse(buyCourseObject),
        onSuccess: async ({ data }) => {
            setModalCloseButton(true);

            console.log(data.message);
        },
    });

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Buy</Button>
            </DialogTrigger>
            <DialogContent>
                {modalCloseButton ? (
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="default"
                                className={"w-full"}
                                onClick={() => {
                                    setTimeout(() => {
                                        setModalCloseButton(false);
                                    }, 1000);
                                }}
                            >
                                {quantity} licenses has been added!
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                ) : (
                    <DialogHeader>
                        <DialogTitle className={"text-center"}>
                            Attention!
                        </DialogTitle>
                        You are about to allocate {quantity} licenses - Total
                        value {formatCurrencyToGBP(totalValue)}
                        <DialogDescription>
                            <br />
                            Ensure you received the payment before adding the
                            licences.
                        </DialogDescription>
                        <br />
                        <Button
                            onClick={() => {
                                buyCourseMutation.mutate(buyCourseObject);
                            }}
                        >
                            Add licences
                        </Button>
                    </DialogHeader>
                )}
            </DialogContent>
        </Dialog>
    );
}
