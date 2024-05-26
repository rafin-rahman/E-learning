import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function CourseCard({
  title,
  courseImage,
  tag,
  viewLink,
  editLink,
}: {
  title: string;
  courseImage: string | null;
  tag: string;
  viewLink: string;
  editLink: string;
}) {
  return (
    <div className="w-48 h-64  shadow group relative ">
      {courseImage ? (
        <img className="w-full" src={"courseImage"} alt="Card image" />
      ) : (
        <div className={"h-20 bg-amber-300"}></div>
      )}

      <div className="px-6 py-4">
        <div className="font-bold text-sm mb-2 group-hover:text-white">
          {title}
        </div>
      </div>
      <div className="px-6 bottom-0 pb-4 absolute">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700  mb-2">
          #{tag}
        </span>
      </div>
      <div className="text-center pb-4 absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/3 hidden group-hover:block ">
        <a href={viewLink}>
          <Button variant={"secondary"} className={"mr-4 mb-2 text-xs"}>
            View
          </Button>
        </a>
        <a href={editLink}>
          <Button variant={"secondary"} className={"mr-4 text-xs"}>
            Edit
          </Button>
        </a>
      </div>
    </div>
  );
}
