import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CourseCard({
  title,
  tag,
  viewLink,
  editLink,
  deliveryPartner,
  imageUrl,
}: {
  title: string;
  tag: string;
  viewLink: string;
  editLink: string;
  deliveryPartner: string;
  imageUrl: string | null;
}) {
  return (
    <div className="w-64 h-80  shadow group relative ">
      {imageUrl ? (
        <div
          className={
            "relative h-32 flex items-center justify-center text-4xl text-gray-600"
          }
        >
          <Image
            className="w-full h-full object-cover"
            src={imageUrl}
            alt="Card image"
            fill
          />
        </div>
      ) : (
        <div className={"h-20 bg-amber-300"}></div>
      )}

      <div className="px-6 py-4 pt-8">
        <div className="font-bold text-sm mb-2 group-hover:text-white group-hover:hidden">
          {title}
        </div>
        <div className={"text-xs text-gray-400 group-hover:hidden "}>
          {deliveryPartner}
        </div>
      </div>
      <div className="px-6 bottom-0 pb-4 absolute">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700  mb-2">
          #{tag}
        </span>
      </div>
      {/*<div className="text-center pb-4 absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/3 hidden group-hover:block ">*/}
      <div className="pb-4 absolute hidden group-hover:block left-6  ">
        <Link href={viewLink}>
          <Button variant={"secondary"} className={"mr-4 mb-2 text-xs"}>
            View
          </Button>
        </Link>
        <Link href={editLink}>
          <Button variant={"secondary"} className={"mr-4 text-xs"}>
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
