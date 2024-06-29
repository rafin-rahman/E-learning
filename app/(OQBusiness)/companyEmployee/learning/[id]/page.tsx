import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockClosedIcon } from "@heroicons/react/16/solid";
import { Switch } from "@/components/ui/switch";
import CourseSlider from "@/components/business/companyEmployee/learning/courseSlider";

export default function CpdDetails({ params }: { params: { id: string } }) {
  //function that takes a string and converts %20 into spaces
  function wordConvert(word: string) {
    return word.replace(/%20/g, " ");
  }

  return (
    <div className={"container "}>
      <h1 className={"text-4xl"}>{wordConvert(params.id)}</h1>

      <Tabs defaultValue="0" className="w-full flex gap-10 mt-20 my-10">
        <TabsList className="flex flex-wrap w-[150px] gap-6 ">
          <TabsTrigger value="0">Intro</TabsTrigger>
          <TabsTrigger value="1">Chapter 1</TabsTrigger>
          <TabsTrigger value="2">Chapter 2</TabsTrigger>
          <TabsTrigger value="3" disabled={true}>
            Chapter 3
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="4" disabled={true}>
            Chapter 4<LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="5" disabled={true}>
            Chapter 5
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="6" disabled={true}>
            Chapter 6<LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>{" "}
          <TabsTrigger value="7" disabled={true}>
            Chapter 7
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="8" disabled={true}>
            Chapter 8<LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="9" disabled={true}>
            Chapter 9
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
          <TabsTrigger value="10" disabled={true}>
            Chapter 10
            <LockClosedIcon className={"h-4 inline ml-2"} />
          </TabsTrigger>
        </TabsList>
        <div className={"w-[80%]"}>
          <TabsContent value="0">
            <Card className={"flex-1"}>
              <CardHeader className={"w-full"}>
                <CardTitle>Introduction</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CourseSlider />
              </CardContent>
              <CardFooter>
                {/*<Badge variant={"secondary"}>Chapter in progress</Badge>*/}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="1">no content</TabsContent>
          <TabsContent value="2">no content</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
