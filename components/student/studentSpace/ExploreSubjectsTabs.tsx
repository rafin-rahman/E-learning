import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function ExploreSubjectsTabs() {
  return (
    <Tabs defaultValue="business" className="w-full mt-10">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="business">Business & Management</TabsTrigger>
        <TabsTrigger value="healthcare">Healthcare & Medicine</TabsTrigger>
        <TabsTrigger value="teaching">Teaching</TabsTrigger>
        <TabsTrigger value="tech">Tech & IT</TabsTrigger>
        <TabsTrigger value="psychology">Psychology </TabsTrigger>
        <TabsTrigger value="science">Science & Engineering </TabsTrigger>
      </TabsList>
      <TabsContent value="business">
        <Card className={"border-none shadow-none"}>
          <CardHeader>
            <CardTitle>Business & Management</CardTitle>
            <CardDescription>
              Boss it in business with our specialist upskilling courses,
              industry certifications and high-flying degrees.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-wrap sm:flex-nowrap ">
            <div className={"flex flex-wrap items-stretch"}>
              <div>
                No matter what your goals are, leading experts from the likes of
                Accenture, AWS and Deakin University will guide you to achieve
                them. From data analytics to digital marketing, start learning
                from the best.
              </div>
              <div className={"border-l-2 border-red-400 pl-10"}>
                <Image
                  src={"/images/icons/quote.png"}
                  className={"rotate-180 inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />{" "}
                The course was beautifully conceptualised, and well presented.
                The videos were lucid, clear, articulate and informative.{" "}
                <Image
                  src={"/images/icons/quote.png"}
                  className={"inline"}
                  width={20}
                  height={20}
                  alt="quote"
                />
              </div>
            </div>
            <div
              className={
                "flex flex-wrap sm:flex-nowrap gap-8  w-full justify-center"
              }
            >
              <div className={"h-72 w-48 bg-amber-300 rounded-2xl"}>
                {/*//TODO add image and follow https://www.futurelearn.com/*/}
              </div>
              <div className={"h-72 w-48 bg-amber-300 rounded-2xl"}></div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Explore courses</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="healthcare">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
